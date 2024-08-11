import { Button, Text, Title } from "@mantine/core";
import { useCallback, useEffect, useRef } from "react";
import { FieldTypes, isWelcomeOrEndingField } from "~/constants/field";
import { useAnswer } from "~/hooks/useAnswer";
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
	answer?: TAnswer;
	className?: string;
}

export type HandleFieldAnswer<T extends TAnswer = TAnswer> = ({
	value,
}: { value: T["value"] }) => void;

export const FieldView = ({
	order,
	field,
	answer,
	className,
}: FieldViewProps) => {
	const { isEnd, goToNextStep } = useSwiperDetails();
	const { button, title } = getFieldProps({ field, isLast: isEnd });

	const { handleAnswer, handleSubmit } = useAnswer({
		isLastStep: isEnd,
		goToNextStep,
	});

	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (isWelcomeOrEndingField(field.type)) {
			buttonRef.current?.focus();
		}
	}, [field.type]);

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
					goToNextStep={goToNextStep}
					onAnswer={handleAnswer}
				/>
			}
			buttonSubmit={
				<Button
					ref={buttonRef}
					type="submit"
					onClick={handleSubmit}
					className={button.className}
				>
					{button.text}
				</Button>
			}
		/>
	);
};

function FieldComponent(
	props: Pick<FieldViewProps, "field" | "answer"> & {
		goToNextStep: () => void;
		onAnswer: (answer: TAnswer) => void;
	},
) {
	const { field, answer, onAnswer, goToNextStep } = props;

	const handleAnswer: HandleFieldAnswer = useCallback(
		({ value }) => {
			const answerField: TAnswer["field"] = {
				id: field.id,
				type: field.type,
				title: field.title,
			};

			const answer = { value, field: answerField } as TAnswer;

			onAnswer(answer);
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
					goToNextStep={goToNextStep}
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
