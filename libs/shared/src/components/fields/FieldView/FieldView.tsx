import { Alert, Button, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useCallback, useEffect, useRef } from "react";
import { useSwiperSlide } from "swiper/react";
import { FieldTypes, isWelcomeOrEndingField } from "~/constants/field";
import { Media } from "~/constants/mediaQueries";
import type { TField } from "~/models/field/schema";
import type {
	TAnswer,
	TAnswerChoice,
	TAnswerText,
} from "~/models/response/schema";
import { FieldBase } from "../FieldBase/FieldBase";
import { getFieldProps } from "../FieldBase/getFieldProps";
import { MultipleChoice } from "../MultipleChoice/MultipleChoice";
import { ShortText } from "../ShortText/ShortText";
import { useSwiperDetails } from "../hooks/useSwiperDetails";
import styles from "./FieldView.module.css";

interface FieldViewProps {
	field: TField;
	order: number;
	isNextHidden: boolean;
	answer?: TAnswer;
	className?: string;
	showRequiredError: boolean;
	onSubmit: () => void;
	onGoNext: () => void;
	onAnswer: (answer: TAnswer) => Promise<void>;
}

export type HandleFieldAnswer<T extends TAnswer = TAnswer> = ({
	value,
}: { value: T["value"] }) => Promise<void>;

export const FieldView = ({
	order,
	field,
	answer,
	onGoNext,
	className,
	onAnswer,
	onSubmit,
	isNextHidden,
	showRequiredError,
}: FieldViewProps) => {
	const isSmallScreen = useMediaQuery(Media.FormViewSmall);

	const { isEnd } = useSwiperDetails();
	const { button, title } = getFieldProps({ field, isLast: isEnd });

	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (isWelcomeOrEndingField(field.type)) {
			buttonRef.current?.focus();
		}
	}, [field.type]);

	const { isActive, isPrev, isNext } = useSwiperSlide();
	const isDefaultHidden = !isActive && !isPrev && !isNext;

	if (isDefaultHidden || (isNext && isNextHidden)) return null;

	const buttonSubmit = isSmallScreen ? null : (
		<Button
			ref={buttonRef}
			type="submit"
			onClick={onSubmit}
			className={button.className}
		>
			{button.text}
		</Button>
	);

	return (
		<FieldBase
			order={order}
			fieldType={field.type}
			classNames={{ root: className, order: styles.order }}
			title={<Title order={1}>{title.text}</Title>}
			description={
				field?.description && <Text size="xl">{field?.description}</Text>
			}
			field={
				<FieldComponent
					field={field}
					answer={answer}
					onAnswer={onAnswer}
					onGoNext={onGoNext}
				/>
			}
			buttonSubmit={
				showRequiredError ? (
					<Alert
						color="red"
						variant="light"
						classNames={{ root: styles.alertRoot, icon: styles.alertIcon }}
						icon={<IconAlertTriangle />}
					>
						<b>Oops!</b> Please answer the question
					</Alert>
				) : (
					buttonSubmit
				)
			}
		/>
	);
};

function FieldComponent(
	props: Pick<FieldViewProps, "field" | "answer"> & {
		onGoNext: () => void;
		onAnswer: (answer: TAnswer) => Promise<void>;
	},
) {
	const { field, answer, onAnswer, onGoNext } = props;

	const handleAnswer: HandleFieldAnswer = useCallback(
		async ({ value }) => {
			const answerField: TAnswer["field"] = {
				id: field.id,
				type: field.type,
				title: field.title,
			};

			const answer = { value, field: answerField } as TAnswer;

			await onAnswer(answer);
		},
		[field.id, field.type, field.title, onAnswer],
	);

	switch (field.type) {
		case FieldTypes.YesNo:
		case FieldTypes.Checkboxes:
		case FieldTypes.MultipleChoice: {
			return (
				<MultipleChoice
					field={field}
					options={field.options}
					answer={answer as TAnswerChoice | undefined}
					onAnswer={handleAnswer}
					goToNextStep={onGoNext}
				/>
			);
		}

		case FieldTypes.ShortText: {
			return (
				<ShortText
					onAnswer={handleAnswer}
					placeholder={field.placeholder}
					initialValue={(answer?.value ?? "") as TAnswerText["value"]}
				/>
			);
		}

		case FieldTypes.Welcome:
		case FieldTypes.Ending:
			return null;

		default:
			return null;
	}
}
