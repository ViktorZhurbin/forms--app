import { id, tx } from "@instantdb/react";
import { dbTransact } from "../../db";
import type { FormType } from "../forms";
import { getDummyFormTitle } from "./helpers";

const createForm = async () => {
	const formId = id();
	const form = {
		name: getDummyFormTitle(),
		responseCount: 0,
		orderedQuestions: [],
	};

	await dbTransact(tx.forms[id()].update(form));

	return formId;
};

const updateForm = async (
	payload: Partial<FormType> & Pick<FormType, "id">,
) => {
	const { id, ...update } = payload;

	await dbTransact(tx.forms[id].update(update));
};

const deleteForm = async (id: FormType["id"]) => {
	dbTransact([tx.forms[id].delete()]);
};

export { createForm, updateForm, deleteForm };
