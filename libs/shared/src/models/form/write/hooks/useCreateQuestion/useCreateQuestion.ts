import { useCallback } from "react";
import type { QuestionTypes } from "~/constants/questions";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useSelectedBlockId } from "~/hooks/useSelectedBlockId";
import { useCurrentForm } from "~/models/form/read";
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
		({ nanoId }) => nanoId === selectedBlockId,
	);

	const createQuestion = useCallback(
		async ({ type, insertBefore }: CreateQuestionParams) => {
			let newBlockIndex: number;

			// TODO: unit test this
			if (typeof selectedBlockOrder !== "number") {
				newBlockIndex = 0;
			} else if (insertBefore) {
				newBlockIndex = selectedBlockOrder;
			} else {
				newBlockIndex = selectedBlockOrder + 1;
			}

			const newQuestion = getCreateQuestionPayload({ type });
			const newQuestions = form?.draftQuestions.toSpliced(
				newBlockIndex,
				0,
				newQuestion,
			);

			await updateForm({
				nanoId: formNanoId,
				draftQuestions: newQuestions,
			});

			return { nanoId: newQuestion.nanoId };
		},
		[formNanoId, form?.draftQuestions, selectedBlockOrder],
	);

	return { createQuestion };
};
