import { id, tx } from "@instantdb/react";
import { dbTransact } from "../../db";
import type { TForm } from "../schema";
import { getDummyFormTitle } from "./helpers";

const createForm = async () => {
	const formId = id();
	const form = {
		name: getDummyFormTitle(),
		responseCount: 0,
		orderedQuestionIds: [],
	};

	await dbTransact(tx.forms[id()].update(form));

	return formId;
};

const updateForm = async (payload: Partial<TForm> & Pick<TForm, "id">) => {
	const { id, ...update } = payload;

	await dbTransact(tx.forms[id].update(update));
};

const updateFormOrderedQuestionIds = async (
	payload: Pick<TForm, "id" | "orderedQuestionIds">,
) => {
	const { id, orderedQuestionIds } = payload;

	await dbTransact(tx.forms[id].update({ orderedQuestionIds }));
};

const deleteForm = async (id: TForm["id"]) => {
	dbTransact([tx.forms[id].delete()]);
};

export { createForm, updateForm, updateFormOrderedQuestionIds, deleteForm };
