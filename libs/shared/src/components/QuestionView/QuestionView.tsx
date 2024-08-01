import { Button, Title } from "@mantine/core";
import { FieldTypes } from "~/constants/field";
import type { FormQuestionsProps } from "~/layouts/Form/FormQuestions/FormQuestions";
import type { TField } from "~/models/field/schema";
import type {
	TAnswer,
	TAnswerChoice,
	TAnswerText,
} from "~/models/response/schema";
import { QuestionBase } from "../QuestionBase/QuestionBase";
import { getFieldProps } from "../QuestionBase/getFieldProps";
import { MultipleChoice } from "../questions/MultipleChoice/MultipleChoice";
import { ShortText } from "../questions/ShortText/ShortText";

interface QuestionViewProps {
	field: TField;
	order: number;
	isLast: boolean;
	answer?: TAnswer;
	onAnswer: (answer: TAnswer) => void;
	goToNextStep: FormQuestionsProps["goToNextStep"];
	onSubmit: () => void;
}

export const QuestionView = ({
	order,
	isLast,
	field,
	answer,
	goToNextStep,
	onSubmit,
	onAnswer,
}: QuestionViewProps) => {
	const { button, title } = getFieldProps({ field, isLast });

	const fieldComponent = getFieldComponent({
		field,
		answer,
		onAnswer,
		goToNextStep,
	});

	return (
		<QuestionBase
			order={order}
			title={<Title order={1}>{title}</Title>}
			question={fieldComponent}
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
}: Pick<QuestionViewProps, "field" | "answer" | "goToNextStep" | "onAnswer">) {
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
