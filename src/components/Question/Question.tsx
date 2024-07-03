import { Stack } from "@mantine/core";
import { QuestionTypes } from "~/constants/questions";
import type { TQuestion } from "~/models/questions/schema";
import { updateQuestion } from "~/models/questions/write";
import { EditableButton } from "../EditableButton/EditableButton";
import { MultipleChoice } from "../MultipleChoice/MultipleChoice";
import { ShortText } from "../ShortText/ShortText";
import { EditableText } from "./EditableText/EditableText";
import styles from "./Question.module.css";

interface QuestionProps {
	question: TQuestion;
	isLast?: boolean;
	readOnly?: boolean;
	onSubmitForm?: () => void;
	goToNextStep?: () => void;
}

export const Question = ({
	isLast,
	question,
	readOnly,
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

	const onChangeTitle = (title: string) => {
		updateQuestion({ id: question.id, title });
	};

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<EditableText
					variant="h1"
					readOnly={readOnly}
					placeholder="Your question here..."
					initialValue={question.title}
					onChange={onChangeTitle}
				/>

				<div className={styles.bottomWrapper}>
					<Stack gap={8} w="100%">
						<QuestionComponent question={question} readOnly={readOnly} />
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

function QuestionComponent({
	question,
	readOnly,
}: Pick<QuestionProps, "readOnly" | "question">) {
	switch (question.type) {
		case QuestionTypes.YesNo:
		case QuestionTypes.MultipleChoice:
			return (
				<MultipleChoice
					readOnly={readOnly}
					questionId={question.id}
					options={question.options}
				/>
			);

		case QuestionTypes.ShortText:
			return <ShortText />;

		default:
			return false;
	}
}
