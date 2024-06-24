import { Stack } from "@mantine/core";
import { useTable } from "tinybase/ui-react";
import { useParams } from "wouter";
import { type QuestionType, QuestionTypes } from "~/constants/questions";
import type { OptionType } from "~/mocks/options";
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
	options: OptionType[],
	readOnly: QuestionProps["readOnly"],
) => {
	switch (question.type) {
		case QuestionTypes.YesNo:
		case QuestionTypes.MultipleChoice:
			return <MultipleChoice readOnly={readOnly} options={options} />;

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
	const formId = useParams()?.id;

	const allQuestions = useTable("questions");
	const formQuestions = Object.values(allQuestions).filter(
		(question) => question.formId === formId,
	) as unknown as QuestionType[];

	const question =
		formQuestions.find((question) => question.id === id) ?? formQuestions?.[0];

	const allOptions = useTable("options");

	const options = (Object.values(allOptions).filter(
		(option) => option.questionId === question.id,
	) ?? []) as unknown as OptionType[];

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
						{getComponentByQuestion(question, options, readOnly)}
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
