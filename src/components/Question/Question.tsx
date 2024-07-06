import { Stack } from "@mantine/core";
import { QuestionTypes } from "~/constants/questions";
import type { TQuestion } from "~/models/forms/schema/questions";
import { useUpdateQuestion } from "~/models/forms/write/hooks/useUpdateQuestion";
import { EditableButton } from "../EditableButton/EditableButton";
import { MultipleChoice } from "../MultipleChoice/MultipleChoice";
import { ShortText } from "../ShortText/ShortText";
import { EditableText } from "./EditableText/EditableText";
import styles from "./Question.module.css";

interface QuestionProps {
	question: TQuestion;
	order: number;
	isLast?: boolean;
	editMode?: boolean;
	onSubmitForm?: () => void;
	goToNextStep?: () => void;
	onFocusElement?: () => void;
}

export const Question = ({
	order,
	isLast,
	question,
	editMode,
	onSubmitForm,
	goToNextStep,
	onFocusElement,
}: QuestionProps) => {
	let buttonText: string;
	let onSubmit: (() => void) | undefined;

	if (isLast) {
		buttonText = "Submit";
		onSubmit = onSubmitForm;
	} else {
		buttonText = "OK";
		onSubmit = goToNextStep;
	}

	const { updateQuestion } = useUpdateQuestion();

	const onChangeTitle = (title: string) => {
		updateQuestion({
			id: question.id,
			payload: { title },
		});
	};

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				{order}.
				<EditableText
					variant="h1"
					readOnly={!editMode}
					placeholder="Your question here..."
					initialValue={question.title || "..."}
					onChange={onChangeTitle}
				/>
				<div className={styles.bottomWrapper}>
					<Stack gap={8} w="100%">
						<QuestionComponent
							question={question}
							editMode={editMode}
							onFocus={onFocusElement}
						/>
					</Stack>

					<EditableButton
						onClick={onSubmit}
						value={buttonText}
						isEditable={Boolean(editMode)}
						classNames={{
							button: styles.submitButton,
						}}
						onFocus={onFocusElement}
					/>
				</div>
			</div>
		</div>
	);
};

type QuestionComponentProps = Pick<QuestionProps, "editMode" | "question"> & {
	onFocus?: () => void;
};

function QuestionComponent({
	question,
	editMode,
	onFocus,
}: QuestionComponentProps) {
	switch (question.type) {
		case QuestionTypes.YesNo:
		case QuestionTypes.MultipleChoice:
			return (
				<MultipleChoice
					onFocus={onFocus}
					editMode={editMode}
					questionId={question.id}
					options={question.options}
				/>
			);

		case QuestionTypes.ShortText:
			return (
				<ShortText
					onFocus={onFocus}
					editMode={editMode}
					questionId={question.id}
					placeholder={question.textPlaceholder}
				/>
			);

		default:
			return false;
	}
}
