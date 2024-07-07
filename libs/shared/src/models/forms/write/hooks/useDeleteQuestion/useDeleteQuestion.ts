import { useCallback } from "react";
import { useFormId } from "~/hooks/useFormId";
import { useCurrentForm } from "~/models/forms/read";
import type { TQuestion } from "../../../schema/questions";
import { updateForm } from "../../write";

export const useDeleteQuestion = () => {
	const formId = useFormId();
	const form = useCurrentForm();

	const deleteQuestion = useCallback(
		async (questionId: TQuestion["id"]) => {
			const newQuestions = form?.questions.filter(
				(question) => question.id !== questionId,
			);

			await updateForm({ id: formId, questions: newQuestions });
		},
		[formId, form?.questions],
	);

	return { deleteQuestion };
};
