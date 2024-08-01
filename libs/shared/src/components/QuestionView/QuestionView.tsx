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
import { MultipleChoice } from "../questions/MultipleChoice/MultipleChoice";
import { ShortText } from "../questions/ShortText/ShortText";

interface QuestionViewProps {
	field: TField;
	order: number;
	isLast: boolean;
	answer?: TAnswer;
	onAnswer: (answer: TAnswer) => void;
	onSubmit: FormQuestionsProps["onSubmit"];
	goToNextStep: FormQuestionsProps["goToNextStep"];
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
	return (
		<QuestionBase
			order={order}
			isLast={isLast}
			question={field}
			// TODO: pass ReactElement instead
			Title={(props: { title: string }) => (
				<Title order={1}>{props.title}</Title>
			)}
			Question={
				<QuestionComponent
					field={field}
					answer={answer}
					goToNextStep={goToNextStep}
					onAnswer={onAnswer}
				/>
			}
			// TODO: pass ReactElement instead
			ButtonSubmit={(props: { className: string; text: string }) => (
				<Button type="submit" onClick={onSubmit} className={props.className}>
					{props.text}
				</Button>
			)}
		/>
	);
};

function QuestionComponent({
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
			return false;
	}
}
