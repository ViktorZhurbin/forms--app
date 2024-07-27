import { QuestionTypes } from "~/constants/questions";
import type { TQuestion } from "~/models/forms/schema/questions";
import { useUpdateQuestion } from "~/models/forms/write/hooks/useUpdateQuestion";
import { EditableButton } from "../EditableButton/EditableButton";
import { EditableTextarea } from "../EditableTextarea/EditableTextarea";
import { QuestionBase } from "../QuestionBase/QuestionBase";
import { MultipleChoice } from "../questions/MultipleChoice/MultipleChoice";
import { ShortTextEdit } from "../questions/ShortText/editable/ShortTextEdit";

interface QuestionEditProps {
	order: number;
	isLast: boolean;
	question: TQuestion;
}

export const QuestionEdit = ({
	order,
	question,
	isLast,
}: QuestionEditProps) => {
	const { updateQuestion } = useUpdateQuestion();

	const onEditTitle = (title: string) => {
		updateQuestion({
			id: question.id,
			payload: { title },
		});
	};

	const onEditButtonText = (buttonText: string) => {
		updateQuestion({
			id: question.id,
			payload: { buttonText },
		});
	};

	return (
		<QuestionBase
			order={order}
			isLast={isLast}
			question={question}
			Title={({ title }: { title: string }) => (
				<EditableTextarea
					variant="h1"
					placeholder="Your question here..."
					initialValue={title}
					onEdit={onEditTitle}
				/>
			)}
			Question={() => <QuestionComponent question={question} />}
			ButtonSubmit={({
				text,
				className,
			}: { text: string; className: string }) => (
				<EditableButton
					isEditable
					onEdit={onEditButtonText}
					value={text}
					classNames={{
						button: className,
					}}
				/>
			)}
		/>
	);
};

function QuestionComponent({ question }: Pick<QuestionEditProps, "question">) {
	switch (question.type) {
		case QuestionTypes.YesNo:
		case QuestionTypes.Checkboxes:
		case QuestionTypes.MultipleChoice:
			return (
				<MultipleChoice
					editMode
					questionId={question.id}
					options={question.options}
					isFixedQuestions={question.type === QuestionTypes.YesNo}
					canChooseMany={question.type === QuestionTypes.Checkboxes}
				/>
			);

		case QuestionTypes.ShortText:
			return (
				<ShortTextEdit
					questionId={question.id}
					placeholder={question.textPlaceholder}
				/>
			);

		default:
			return false;
	}
}
