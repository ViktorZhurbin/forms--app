import { Button, Title } from "@mantine/core";
import { QuestionTypes } from "~/constants/questions";
import type { TQuestion } from "~/models/field/schema";
import { QuestionBase } from "../QuestionBase/QuestionBase";
import { MultipleChoice } from "../questions/MultipleChoice/MultipleChoice";
import { ShortText } from "../questions/ShortText/ShortText";

interface QuestionViewProps {
	question: TQuestion;
	order: number;
	isLast: boolean;
	onSubmitForm: () => void;
	goToNextStep: () => void;
}

export const QuestionView = ({
	order,
	isLast,
	question,
	onSubmitForm,
	goToNextStep,
}: QuestionViewProps) => {
	const onSubmit = isLast ? onSubmitForm : goToNextStep;

	return (
		<QuestionBase
			order={order}
			isLast={isLast}
			question={question}
			Title={({ title }: { title: string }) => <Title order={1}>{title}</Title>}
			Question={() => (
				<QuestionComponent question={question} goToNextStep={goToNextStep} />
			)}
			ButtonSubmit={({
				text,
				className,
			}: { className: string; text: string }) => (
				<Button onClick={onSubmit} className={className}>
					{text}
				</Button>
			)}
		/>
	);
};

function QuestionComponent({
	question,
	goToNextStep,
}: Pick<QuestionViewProps, "question" | "goToNextStep">) {
	switch (question.type) {
		case QuestionTypes.YesNo:
		case QuestionTypes.Checkboxes:
		case QuestionTypes.MultipleChoice:
			return (
				<MultipleChoice
					questionId={question.id}
					options={question.options}
					questionType={question.type}
					onSelect={goToNextStep}
				/>
			);

		case QuestionTypes.ShortText:
			return (
				<ShortText
					questionId={question.id}
					placeholder={question.textPlaceholder}
				/>
			);

		default:
			return false;
	}
}
