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
	isLast?: boolean;
	editMode?: boolean;
	onSubmitForm?: () => void;
	goToNextStep?: () => void;
}

export const Question = ({
	isLast,
	question,
	editMode,
	onSubmitForm,
	goToNextStep,
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
				<EditableText
					variant="h1"
					readOnly={!editMode}
					placeholder="Your question here..."
					initialValue={question.title}
					onChange={onChangeTitle}
				/>

				<div className={styles.bottomWrapper}>
					<Stack gap={8} w="100%">
						<QuestionComponent question={question} editMode={editMode} />
					</Stack>

					<EditableButton
						onClick={onSubmit}
						value={buttonText}
						isEditable={Boolean(editMode)}
						classNames={{
							button: styles.submitButton,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

function QuestionComponent({
	question,
	editMode,
}: Pick<QuestionProps, "editMode" | "question">) {
	switch (question.type) {
		case QuestionTypes.YesNo:
		case QuestionTypes.MultipleChoice:
			return (
				<MultipleChoice
					editMode={editMode}
					questionId={question.id}
					options={question.options}
				/>
			);

		case QuestionTypes.ShortText:
			return (
				<ShortText
					editMode={editMode}
					questionId={question.id}
					placeholder={question.textPlaceholder}
				/>
			);

		default:
			return false;
	}
}
