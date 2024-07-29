import { useCallback } from "react";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useCurrentForm } from "~/models/form/read";
import type { TQuestion } from "../../../../question/schema/question";
import { updateForm } from "../../write";

export const useDeleteQuestion = () => {
	const formNanoId = useFormNanoId();
	const form = useCurrentForm();

	const deleteQuestion = useCallback(
		async (questionId: TQuestion["id"]) => {
			const newQuestions = form?.draftQuestions.filter(
				(question) => question.id !== questionId,
			);

			await updateForm({
				nanoId: formNanoId,
				draftQuestions: newQuestions,
			});
		},
		[formNanoId, form?.draftQuestions],
	);

	return { deleteQuestion };
};
