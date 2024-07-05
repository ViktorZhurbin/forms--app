import { useCallback } from "react";
import type { QuestionTypes } from "~/constants/questions";
import { useFormId } from "~/layouts/Builder/hooks/useFormId";
import { useSelectedBlockId } from "~/layouts/Builder/hooks/useSelectedBlockId";
import { useForm } from "~/models/forms/read";
import { updateForm } from "../../write";
import { getCreateQuestionPayload } from "./helpers/getCreateQuestionPayload";

type CreateQuestionParams = {
	type: QuestionTypes;
	insertBefore?: boolean;
};

export const useCreateQuestion = () => {
	const formId = useFormId();
	const selectedBlockId = useSelectedBlockId();
	const form = useForm(formId);

	const selectedBlockOrder = form?.questions.findIndex(
		({ id }) => id === selectedBlockId,
	);

	const createQuestion = useCallback(
		async ({ type, insertBefore }: CreateQuestionParams) => {
			let newBlockOrder: number;

			// TODO: unit test this
			if (typeof selectedBlockOrder !== "number") {
				newBlockOrder = 0;
			} else if (insertBefore) {
				newBlockOrder = selectedBlockOrder;
			} else {
				newBlockOrder = selectedBlockOrder + 1;
			}

			const newQuestion = getCreateQuestionPayload({ type });
			const newQuestions = form?.questions.toSpliced(
				newBlockOrder,
				0,
				newQuestion,
			);

			await updateForm({ id: formId, questions: newQuestions });

			return newQuestion.id;
		},
		[formId, form?.questions, selectedBlockOrder],
	);

	return { createQuestion };
};
