import { useSelectedBlockId } from "@/shared/hooks/useSelectedBlockId";
import { useCurrentFormQuery } from "@/shared/models/form/read";

export const useCurrentQuestion = () => {
	const { data } = useCurrentFormQuery();
	const selectedBlockId = useSelectedBlockId();

	const form = data?.forms?.[0];

	const index =
		form?.draftQuestions.findIndex(
			(question) => question.nanoId === selectedBlockId,
		) ?? null;

	const question = index !== null && form?.draftQuestions[index];
	const order = index === null ? 1 : index + 1;
	const isLast = order === form?.draftQuestions.length;

	return { question, order, isLast };
};
