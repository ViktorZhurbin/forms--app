import { useDbQuery } from "~/models/db";
import { useForm } from "../forms/read";

const useQuestionsQuery = (formId: string) => {
	return useDbQuery({
		questions: {
			$: { where: { formId } },
		},
	});
};

export const useOrderedQuestionsQuery = (formId: string) => {
	const form = useForm(formId);
	const questionsQuery = useQuestionsQuery(formId);

	if (!questionsQuery.data || !form) {
		return questionsQuery;
	}

	const sortedData = { ...questionsQuery.data };

	sortedData.questions = form.orderedQuestionIds.flatMap((id) => {
		const question = sortedData.questions.find(
			(question) => question.id === id,
		);

		return question ?? [];
	});

	return { ...questionsQuery, data: sortedData };
};

export const useQuestion = ({
	formId,
	questionId,
}: { formId: string; questionId?: string }) => {
	const { data } = useQuestionsQuery(formId);

	if (!questionId || !data) return;

	return data.questions.find((question) => question.id === questionId);
};
