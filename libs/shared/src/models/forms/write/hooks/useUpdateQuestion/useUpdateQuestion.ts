import { useCallback } from "react";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useCurrentForm } from "~/models/forms/read";
import type { TQuestion } from "../../../schema/questions";
import { updateForm } from "../../write";

type UpdateQuestionParams = {
	id: TQuestion["id"];
	payload: Partial<TQuestion>;
};

export const useUpdateQuestion = () => {
	const formNanoId = useFormNanoId();
	const form = useCurrentForm();

	const updateQuestion = useCallback(
		async ({ id, payload }: UpdateQuestionParams) => {
			const newQuestions = form?.draftQuestions.map((question) => {
				if (question.id === id) {
					return { ...question, ...payload } as TQuestion;
				}

				return question;
			});

			await updateForm({
				nanoId: formNanoId,
				draftQuestions: newQuestions,
			});
		},
		[formNanoId, form?.draftQuestions],
	);

	return { updateQuestion };
};
