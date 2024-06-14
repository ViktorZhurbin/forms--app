import { Button, Stack, Title } from "@mantine/core";

import { type QuestionType, QuestionTypes } from "../../constants/questions";
import { MultipleChoice } from "../MultipleChoice/MultipleChoice";
import { ShortText } from "../ShortText/ShortText";

import { formFields } from "../../mocks/formQuestions";
import styles from "./Question.module.css";

interface QuestionProps {
	id: QuestionType["id"];
	isLast?: boolean;
	onSubmitForm?: () => void;
	goToNextStep?: () => void;
}

const getComponentByQuestion = (question: QuestionType) => {
	switch (question.type) {
		case QuestionTypes.YesNo:
		case QuestionTypes.MultipleChoice:
			return <MultipleChoice question={question} />;

		case QuestionTypes.ShortText:
			return <ShortText question={question} />;

		default:
			return false;
	}
};

export const Question = ({
	id,
	isLast,
	onSubmitForm,
	goToNextStep,
}: QuestionProps) => {
	const question = formFields.find((question) => question.id === id);

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
				<Title className={styles.header}>{question.title}</Title>

				<Stack gap={16} align="flex-start">
					<div className={styles.optionWrapper}>
						{getComponentByQuestion(question)}
					</div>

					<Button
						type="submit"
						className={styles.submitButton}
						onClick={onSubmit}
					>
						{buttonText}
					</Button>
				</Stack>
			</div>
		</div>
	);
};
