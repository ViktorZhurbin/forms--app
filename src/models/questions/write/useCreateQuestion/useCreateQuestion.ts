import { id, tx } from "@instantdb/react";
import type { QuestionTypes } from "~/constants/questions";
import { useSelectedBlockId } from "~/layouts/Builder/hooks/useSelectedBlockId";
import { dbTransact } from "~/models/db";
import { useOrderedQuestions } from "~/models/questions/read";
import { getQuestionUpdatePayload } from "./helpers/getQuestionUpdatePayload";

type UseCreateQuestionParams = {
	formId: string;
	type: QuestionTypes;
	insertBefore?: boolean;
};

export const useCreateQuestion = ({
	formId,
	type,
	insertBefore,
}: UseCreateQuestionParams) => {
	const selectedBlockId = useSelectedBlockId();
	const questions = useOrderedQuestions({ formId });

	const selectedBlockOrder = questions.find(
		({ id }) => id === selectedBlockId,
	)?.order;

	let newBlockOrder: number;

	// TODO: unit test this
	if (typeof selectedBlockOrder !== "number") {
		newBlockOrder = 0;
	} else if (insertBefore) {
		newBlockOrder = selectedBlockOrder;
	} else {
		newBlockOrder = selectedBlockOrder + 1;
	}

	const questionUpdatePayload = getQuestionUpdatePayload({
		formId,
		type,
		order: newBlockOrder,
	});

	// increment order of each question after inseted one
	const updatedQuestionsOrderTxns = questions
		.slice(newBlockOrder)
		.map(({ id, order }) => tx.questions[id].update({ order: order + 1 }));

	const questionId = id();

	const createQuestion = async () => {
		await dbTransact([
			// create question
			tx.questions[questionId].update(questionUpdatePayload),

			// update questions order
			...updatedQuestionsOrderTxns,
		]);
	};

	return { createQuestion, questionId };
};
