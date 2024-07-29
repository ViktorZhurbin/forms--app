import { id, lookup, tx } from "@instantdb/react";
import type { QuestionTypes } from "~/constants/questions";
import { makeSubId } from "~/utils/makeId";
import { dbTransact } from "../db";
import type { TForm } from "../form/schema/form";
import { getCreateQuestionPayload } from "../form/write/hooks/useCreateQuestion";
import type { TQuestion } from "./schema/question";

type CreateQuestionParams = {
	type: QuestionTypes;
	formNanoId: TForm["nanoId"];
	insertBefore?: boolean;
};

const createQuestion = async ({ formNanoId, type }: CreateQuestionParams) => {
	const questionId = id();
	const nanoId = makeSubId();

	const newQuestion = getCreateQuestionPayload({ type });

	await dbTransact(
		tx.questions[questionId]
			.update(newQuestion)
			.link({ forms: lookup("nanoId", formNanoId) }),
	);

	return nanoId;
};

const updateQuestion = async (
	payload: Partial<TQuestion> & { nanoId: TQuestion["nanoId"] },
) => {
	const { nanoId, ...update } = payload;

	await dbTransact(tx.questions[lookup("nanoId", nanoId)].update(update));
};

const deleteQuestion = async ({ nanoId }: { nanoId: TQuestion["nanoId"] }) => {
	dbTransact([tx.questions[lookup("nanoId", nanoId)].delete()]);
};

export { createQuestion, updateQuestion, deleteQuestion };
