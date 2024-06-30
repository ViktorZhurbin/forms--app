import { useDbQuery } from "~/models/db";

export const useFormQuestions = (formId: string) => {
	return useDbQuery({
		questions: {
			$: { where: { formId } },
		},
	});
};

export const useFormQuestion = ({
	formId,
	questionId,
}: { formId: string; questionId?: string }) => {
	const { data } = useFormQuestions(formId);

	if (!questionId || !data) return;

	return data.questions.find((question) => question.id === questionId);
};