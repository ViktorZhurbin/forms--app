import { tx } from "@instantdb/react";
import type { QuestionTypes } from "~/constants/questions";
import { useFormId } from "~/layouts/Builder/hooks/useFormId";
import { useSelectedBlockId } from "~/layouts/Builder/hooks/useSelectedBlockId";
import { dbTransact } from "~/models/db";
import { useForm } from "~/models/forms/read";
import { getQuestionUpdatePayload } from "./helpers/getQuestionUpdatePayload";

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

	const createQuestion = async ({
		type,
		insertBefore,
	}: CreateQuestionParams) => {
		let newBlockOrder: number;

		// TODO: unit test this
		if (typeof selectedBlockOrder !== "number") {
			newBlockOrder = 0;
		} else if (insertBefore) {
			newBlockOrder = selectedBlockOrder;
		} else {
			newBlockOrder = selectedBlockOrder + 1;
		}

		const newQuestion = getQuestionUpdatePayload({ type });
		const newQuestions = form?.questions.toSpliced(
			newBlockOrder,
			0,
			newQuestion,
		);

		await dbTransact(tx.forms[formId].update({ questions: newQuestions }));

		return newQuestion.id;
	};

	return { createQuestion };
};
