import { Button, Title } from "@mantine/core";
import { FieldTypes } from "~/constants/field";
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
	isLast: boolean;
	answer?: TAnswer;
	onAnswer: (answer: TAnswer) => void;
	onSubmit: () => void;
	goToNextStep: () => void;
}

export const FieldView = ({
	order,
	isLast,
	field,
	answer,
	goToNextStep,
	onSubmit,
	onAnswer,
}: FieldViewProps) => {
	const { button, title } = getFieldProps({ field, isLast });

	const fieldComponent = getFieldComponent({
		field,
		answer,
		onAnswer,
		goToNextStep,
	});

	return (
		<FieldBase
			order={order}
			title={<Title order={1}>{title}</Title>}
			field={fieldComponent}
			buttonSubmit={
				<Button type="submit" onClick={onSubmit} className={button.className}>
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
}: Pick<FieldViewProps, "field" | "answer" | "goToNextStep" | "onAnswer">) {
	switch (field.type) {
		case FieldTypes.YesNo:
		case FieldTypes.Checkboxes:
		case FieldTypes.MultipleChoice: {
			return (
				<MultipleChoice
					fieldId={field.id}
					fieldType={field.type}
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
					fieldId={field.id}
					fieldType={field.type}
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
