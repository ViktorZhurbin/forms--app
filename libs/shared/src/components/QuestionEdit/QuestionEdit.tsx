import { QuestionTypes } from "~/constants/questions";
import type { TQuestion } from "~/models/field/schema";
import { updateField } from "~/models/field/write";
import { EditableButton } from "../EditableButton/EditableButton";
import { EditableTextarea } from "../EditableTextarea/EditableTextarea";
import { QuestionBase } from "../QuestionBase/QuestionBase";
import { MultipleChoiceEdit } from "../questions/MultipleChoice/editable/MultipleChoiceEdit";
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
	const onEditTitle = (title: string) => {
		updateField({
			id: question.id,
			payload: { title },
		});
	};

	const onEditButtonText = (buttonText: string) => {
		updateField({
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
				<MultipleChoiceEdit
					questionId={question.id}
					questionType={question.type}
					options={question.options}
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
