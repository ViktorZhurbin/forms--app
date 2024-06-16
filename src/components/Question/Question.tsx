import { Button, Stack } from "@mantine/core";
import { type QuestionType, QuestionTypes } from "../../constants/questions";
import { formFields } from "../../mocks/formQuestions";
import { MultipleChoice } from "../MultipleChoice/MultipleChoice";
import { ShortText } from "../ShortText/ShortText";
import { EditableTitle } from "./EditableTitle/EditableTitle";

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
			return <ShortText />;

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
		<Stack p="0 40px">
			<Stack
				align="start"
				justify="center"
				flex={1}
				gap="32px"
				maw="720px"
				m="0 auto"
			>
				<EditableTitle initialValue={question.title} />

				<Stack gap={16} align="flex-start">
					<Stack gap={8} w="100%">
						{getComponentByQuestion(question)}
					</Stack>

					<Button fw="bold" w="unset" type="submit" onClick={onSubmit}>
						{buttonText}
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
};
