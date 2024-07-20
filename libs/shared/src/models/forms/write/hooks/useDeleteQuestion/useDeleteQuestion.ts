import { useCallback } from "react";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useCurrentForm } from "~/models/forms/read";
import type { TQuestion } from "../../../schema/questions";
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
				nanoid: formNanoId,
				draftQuestions: newQuestions,
			});
		},
		[formNanoId, form?.draftQuestions],
	);

	return { deleteQuestion };
};
