import { useCallback } from "react";
import { useFormId } from "~/hooks/useFormId";
import { useCurrentForm } from "~/models/forms/read";
import type { TQuestion } from "../../../schema/questions";
import { updateForm } from "../../write";

type UpdateQuestionParams = {
	id: TQuestion["id"];
	payload: Partial<TQuestion>;
};

export const useUpdateQuestion = () => {
	const formId = useFormId();
	const form = useCurrentForm();

	const updateQuestion = useCallback(
		async ({ id, payload }: UpdateQuestionParams) => {
			const newQuestions = form?.draftQuestions.map((question) => {
				if (question.id === id) {
					return { ...question, ...payload } as TQuestion;
				}

				return question;
			});

			await updateForm({ id: formId, draftQuestions: newQuestions });
		},
		[formId, form?.draftQuestions],
	);

	return { updateQuestion };
};
