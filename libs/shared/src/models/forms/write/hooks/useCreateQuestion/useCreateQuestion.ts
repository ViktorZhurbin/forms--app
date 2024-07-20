import { useCallback } from "react";
import type { QuestionTypes } from "~/constants/questions";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useSelectedBlockId } from "~/hooks/useSelectedBlockId";
import { useCurrentForm } from "~/models/forms/read";
import { updateForm } from "../../write";
import { getCreateQuestionPayload } from "./helpers/getCreateQuestionPayload";

type CreateQuestionParams = {
	type: QuestionTypes;
	insertBefore?: boolean;
};

export const useCreateQuestion = () => {
	const formNanoId = useFormNanoId();
	const selectedBlockId = useSelectedBlockId();
	const form = useCurrentForm();

	const selectedBlockOrder = form?.draftQuestions.findIndex(
		({ nanoid }) => nanoid === selectedBlockId,
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
			const newQuestions = form?.draftQuestions.toSpliced(
				newBlockOrder,
				0,
				newQuestion,
			);

			await updateForm({
				nanoid: formNanoId,
				draftQuestions: newQuestions,
			});

			return { nanoid: newQuestion.nanoid };
		},
		[formNanoId, form?.draftQuestions, selectedBlockOrder],
	);

	return { createQuestion };
};
