import { Button, Title } from "@mantine/core";
import { useCallback } from "react";
import { FieldTypes } from "~/constants/field";
import { useAnswer } from "~/hooks/useAnswer";
import { useSwiperDetails } from "~/layouts/Form/useSwiperDetails";
import type { TField } from "~/models/field/schema";
import type {
	TAnswer,
	TAnswerChoice,
	TAnswerText,
} from "~/models/response/schema";
import { FieldBase } from "../FieldBase/FieldBase";
import { getFieldProps } from "../FieldBase/getFieldProps";
import { MultipleChoice } from "../fields/MultipleChoice/MultipleChoice";
import { ShortText } from "../fields/ShortText/ShortText";

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

	const handleFieldAnswer: HandleFieldAnswer = useCallback(
		({ value }) => {
			const partialField: TAnswer["field"] = {
				id: field.id,
				type: field.type,
				title: field.title,
			};

			const answer = { value, field: partialField } as TAnswer;

			handleAnswer(answer);
		},
		[field, handleAnswer],
	);

	const fieldComponent = getFieldComponent({
		field,
		answer,
		goToNextStep,
		onAnswer: handleFieldAnswer,
	});

	return (
		<FieldBase
			order={order}
			className={className}
			title={<Title order={1}>{title}</Title>}
			field={fieldComponent}
			buttonSubmit={
				<Button
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

function getFieldComponent({
	field,
	answer,
	onAnswer,
	goToNextStep,
}: Pick<FieldViewProps, "field" | "answer"> & {
	goToNextStep: () => void;
	onAnswer: HandleFieldAnswer;
}) {
	switch (field.type) {
		case FieldTypes.YesNo:
		case FieldTypes.Checkboxes:
		case FieldTypes.MultipleChoice: {
			return (
				<MultipleChoice
					field={field}
					options={field.options}
					answer={answer as TAnswerChoice | undefined}
					onAnswer={onAnswer}
					goToNextStep={goToNextStep}
				/>
			);
		}

		case FieldTypes.ShortText: {
			return (
				<ShortText
					onAnswer={onAnswer}
					placeholder={field.textPlaceholder}
					initialValue={(answer?.value ?? "") as TAnswerText["value"]}
				/>
			);
		}

		default:
			return null;
	}
}
