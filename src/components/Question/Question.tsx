import { Stack } from "@mantine/core";
import { type QuestionType, QuestionTypes } from "~/constants/questions";
import { formFields } from "~/mocks/formQuestions";
import { EditableButton } from "../EditableButton/EditableButton";
import { MultipleChoice } from "../MultipleChoice/MultipleChoice";
import { ShortText } from "../ShortText/ShortText";
import { EditableTitle } from "./EditableTitle/EditableTitle";
import styles from "./Question.module.css";

interface QuestionProps {
	id: QuestionType["id"] | null;
	isLast?: boolean;
	readOnly?: boolean;
	onSubmitForm?: () => void;
	goToNextStep?: () => void;
}

const getComponentByQuestion = (
	question: QuestionType,
	readOnly: QuestionProps["readOnly"],
) => {
	switch (question.type) {
		case QuestionTypes.YesNo:
		case QuestionTypes.MultipleChoice:
			return <MultipleChoice readOnly={readOnly} question={question} />;

		case QuestionTypes.ShortText:
			return <ShortText />;

		default:
			return false;
	}
};

export const Question = ({
	id,
	isLast,
	readOnly,
	onSubmitForm,
	goToNextStep,
}: QuestionProps) => {
	const question =
		formFields.find((question) => question.id === id) ?? formFields?.[0];

	if (!question) return null;

	let buttonText: string;
	let onSubmit: (() => void) | undefined;

	if (isLast) {
		buttonText = "Submit";
		onSubmit = onSubmitForm;
	} else {
		buttonText = "OK";
		onSubmit = goToNextStep;
	}

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<EditableTitle readOnly={readOnly} initialValue={question.title} />

				<div className={styles.bottomWrapper}>
					<Stack gap={8} w="100%">
						{getComponentByQuestion(question, readOnly)}
					</Stack>

					<EditableButton
						onClick={onSubmit}
						value={buttonText}
						isEditable={!readOnly}
						classNames={{
							button: styles.submitButton,
						}}
					/>
				</div>
			</div>
		</div>
	);
};
