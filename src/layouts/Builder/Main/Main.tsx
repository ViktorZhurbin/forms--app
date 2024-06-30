import { Center } from "@mantine/core";
import { Question } from "~/components/Question/Question";
import { db } from "~/models/db";
import { useSelectedBlockId } from "../hooks/useSelectedBlockId";

export const Main = ({ formId }: { formId: string }) => {
	const questionId = useSelectedBlockId();

	const { data } = db.useQuery({
		questions: {
			$: { where: { formId } },
		},
	});

	if (!questionId || !formId) return null;

	const question = data?.questions?.find(
		(question) => question.id === questionId,
	);

	return (
		!!question && (
			<Center flex={1}>
				<Question question={question} />
			</Center>
		)
	);
};
