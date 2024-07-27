import { Stack, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { QuestionTypes } from "~/constants/questions";
import type { TQuestion } from "~/models/forms/schema/questions";
import { useUpdateQuestion } from "~/models/forms/write/hooks/useUpdateQuestion";
import { EditableButton } from "../EditableButton/EditableButton";
import { EditableTextarea } from "../EditableTextarea/EditableTextarea";
import { MultipleChoice } from "../questions/MultipleChoice/MultipleChoice";
import { ShortText } from "../questions/ShortText/ShortText";
import styles from "./Question.module.css";

interface QuestionProps {
	question: TQuestion;
	order: number;
	isLast?: boolean;
	editMode?: boolean;
	onSubmitForm?: () => void;
	goToNextStep?: () => void;
}

export const Question = ({
	order,
	isLast,
	question,
	editMode,
	onSubmitForm,
	goToNextStep,
}: QuestionProps) => {
	let buttonTextFallback: string;
	let onSubmit: (() => void) | undefined;

	if (isLast) {
		buttonTextFallback = "Submit";
		onSubmit = onSubmitForm;
	} else {
		buttonTextFallback = "OK";
		onSubmit = goToNextStep;
	}

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
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<div className={styles.titleWrapper}>
					<div className={styles.order}>
						<Text>{order}</Text> <IconArrowRight />
					</div>
					<EditableTextarea
						variant="h1"
						readOnly={!editMode}
						placeholder="Your question here..."
						initialValue={question.title || "..."}
						onEdit={onEditTitle}
					/>
				</div>
				<div className={styles.bottomWrapper}>
					<Stack gap={8} w="100%">
						<QuestionComponent
							question={question}
							editMode={editMode}
							goToNextStep={goToNextStep}
						/>
					</Stack>

					<EditableButton
						onClick={onSubmit}
						value={question.buttonText || buttonTextFallback}
						onEdit={onEditButtonText}
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
	goToNextStep,
}: Pick<QuestionProps, "editMode" | "question" | "goToNextStep">) {
	switch (question.type) {
		case QuestionTypes.YesNo:
		case QuestionTypes.Checkboxes:
		case QuestionTypes.MultipleChoice:
			return (
				<MultipleChoice
					editMode={editMode}
					questionId={question.id}
					options={question.options}
					onSelect={goToNextStep}
					isFixedQuestions={question.type === QuestionTypes.YesNo}
					canChooseMany={question.type === QuestionTypes.Checkboxes}
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
