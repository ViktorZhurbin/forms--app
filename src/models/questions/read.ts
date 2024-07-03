import { useDbQuery } from "~/models/db";

export const useFormQuestions = (formId: string) => {
	const qustions = useDbQuery({
		questions: {
			$: { where: { formId } },
		},
	});

	return qustions;
};

export const useFormQuestion = ({
	formId,
	questionId,
}: { formId: string; questionId?: string }) => {
	const { data } = useFormQuestions(formId);

	if (!questionId || !data) return;

	return data.questions.find((question) => question.id === questionId);
};
