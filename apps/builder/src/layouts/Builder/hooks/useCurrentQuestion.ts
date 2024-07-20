import { useSelectedBlockId } from "@/shared/hooks/useSelectedBlockId";
import { useCurrentFormQuery } from "@/shared/models/forms/read";

export const useCurrentQuestion = () => {
	const { data } = useCurrentFormQuery();
	const selectedBlockId = useSelectedBlockId();

	const form = data?.forms?.[0];

	const index =
		form?.draftQuestions.findIndex(
			(question) => question.nanoid === selectedBlockId,
		) ?? null;

	const question = index !== null && form?.draftQuestions[index];
	const order = index && index + 1;

	return { question, order };
};
