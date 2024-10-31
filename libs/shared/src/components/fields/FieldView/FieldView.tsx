import { Button, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
import { useCallback, useEffect, useRef } from "react";
import { useSlideItem } from "~/components/slider/context/SlideItemContext";
import { useSlider } from "~/components/slider/context/SliderContext";
import { FieldTypes } from "~/constants/field";
import { Media } from "~/constants/mediaQueries";
import type { TField, TFieldQuestion } from "~/models/field/schema";
import type {
	TAnswer,
	TAnswerChoice,
	TAnswerText,
} from "~/models/response/schema";
import { isFieldRequired, isQuestionField } from "~/utils/fieldPredicates";
import { FieldBase } from "../FieldBase/FieldBase";
import { getFieldProps } from "../FieldBase/getFieldProps";
import { MultipleChoice } from "../MultipleChoice/MultipleChoice";
import { ShortText } from "../ShortText/ShortText";
import { AlertError } from "./AlertError/AlertError";
import styles from "./FieldView.module.css";

interface FieldViewProps {
	index: number;
	field: TField;
	answer?: TAnswer;
	className?: string;
	isNextHidden: boolean;
	onSubmit: () => void;
	onAnswer: (answer: TAnswer) => Promise<void>;
}

export type HandleFieldAnswer<T extends TAnswer = TAnswer> = ({
	value,
}: { value: T["value"] }) => Promise<void>;

export const FieldView = ({
	field,
	index,
	answer,
	className,
	onAnswer,
	onSubmit,
	isNextHidden,
}: FieldViewProps) => {
	const isSmallScreen = useMediaQuery(Media.FormViewSmall);

	const { lastIndex, showError, errorType } = useSlider();

	const { button, title } = getFieldProps({
		field,
		isLastQuestion: lastIndex === index,
	});

	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isQuestionField(field)) {
			buttonRef.current?.focus();
		}
	}, [field]);

	const { isActive, isPrev, isNext } = useSlideItem();
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

	const isRequired = isFieldRequired(field);

	const fieldComponent = isQuestionField(field) ? (
		<FieldComponent field={field} answer={answer} onAnswer={onAnswer} />
	) : null;

	const titleComponent = (
		<Title
			order={1}
			className={clsx(styles.title, {
				[styles.isRequired]: isRequired,
			})}
		>
			{title.text || "..."}
		</Title>
	);

	return (
		<FieldBase
			order={index + 1}
			field={field}
			classNames={{ root: className, order: styles.order }}
			title={titleComponent}
			description={
				field?.description && <Text size="xl">{field?.description}</Text>
			}
			fieldComponent={fieldComponent}
			buttonSubmit={
				showError && errorType ? (
					<AlertError errorType={errorType} />
				) : (
					buttonSubmit
				)
			}
		/>
	);
};

function FieldComponent(props: {
	field: TFieldQuestion;
	answer?: TAnswer;
	onAnswer: (answer: TAnswer) => Promise<void>;
}): JSX.Element | null {
	const { field, answer, onAnswer } = props;

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
		case FieldTypes.MultipleChoice:
			return (
				<MultipleChoice
					field={field}
					options={field.options}
					answer={answer as TAnswerChoice | undefined}
					onAnswer={handleAnswer}
				/>
			);

		case FieldTypes.Email:
		case FieldTypes.ShortText:
			return (
				<ShortText
					onAnswer={handleAnswer}
					placeholder={field.placeholder}
					initialValue={(answer?.value ?? "") as TAnswerText["value"]}
				/>
			);
	}
}
