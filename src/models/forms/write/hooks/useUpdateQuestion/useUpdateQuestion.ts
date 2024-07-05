import { useCallback } from "react";
import { useFormId } from "~/layouts/Builder/hooks/useFormId";
import { useForm } from "~/models/forms/read";
import type { TQuestion } from "../../../schema/questions";
import { updateForm } from "../../write";

type UpdateQuestionParams = {
	id: TQuestion["id"];
	payload: Partial<TQuestion>;
};

export const useUpdateQuestion = () => {
	const formId = useFormId();
	const form = useForm(formId);

	const updateQuestion = useCallback(
		async ({ id, payload }: UpdateQuestionParams) => {
			const newQuestions = form?.questions.map((question) => {
				if (question.id === id) {
					return { ...question, ...payload } as TQuestion;
				}

				return question;
			});

			await updateForm({ id: formId, questions: newQuestions });
		},
		[formId, form?.questions],
	);

	return { updateQuestion };
};
