import { Center } from "@mantine/core";
import { Question } from "~/components/Question/Question";
import { useFormQuestion } from "~/hooks/queries/useFormQuestions";
import { useFormId } from "../hooks/useFormId";
import { useSelectedBlockId } from "../hooks/useSelectedBlockId";

export const Main = () => {
	const formId = useFormId();
	const questionId = useSelectedBlockId();
	const question = useFormQuestion({ formId, questionId });

	if (!question) return null;

	return (
		<Center flex={1}>
			<Question question={question} />
		</Center>
	);
};
