import { useDbQuery } from "~/models/db";

const useQuestionsQuery = (formId: string) => {
	return useDbQuery({
		questions: {
			$: { where: { formId } },
		},
	});
};

export const useOrderedQuestionsQuery = (formId: string) => {
	const query = useQuestionsQuery(formId);

	query.data?.questions.sort((a, b) => a.order - b.order);

	return query;
};

export const useOrderedQuestions = ({ formId }: { formId: string }) => {
	const { data } = useOrderedQuestionsQuery(formId);

	return data?.questions ?? [];
};

export const useQuestion = ({
	formId,
	questionId,
}: { formId: string; questionId?: string }) => {
	const { data } = useQuestionsQuery(formId);

	if (!questionId || !data) return;

	return data.questions.find((question) => question.id === questionId);
};
