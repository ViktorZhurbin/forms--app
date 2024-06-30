import { Center } from "@mantine/core";
import { Question } from "~/components/Question/Question";
import { useFormQuestion } from "~/hooks/queries/useFormQuestions";
import { useSelectedBlockId } from "../hooks/useSelectedBlockId";

export const Main = ({ formId }: { formId: string }) => {
	const questionId = useSelectedBlockId();

	const question = useFormQuestion({ formId, questionId });

	if (!question) return null;

	return (
		!!question && (
			<Center flex={1}>
				<Question question={question} />
			</Center>
		)
	);
};
