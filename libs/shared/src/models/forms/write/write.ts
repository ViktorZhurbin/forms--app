import { id, tx } from "@instantdb/react";
import { dbTransact } from "../../db";
import type { TForm } from "../schema/forms";
import { getDummyFormTitle } from "./helpers";

const createForm = async () => {
	const formId = id();
	const form: Partial<TForm> = {
		name: getDummyFormTitle(),
		responseCount: 0,
		questions: [],
	};

	await dbTransact(tx.forms[formId].update(form));

	return formId;
};

const updateForm = async (payload: Partial<TForm> & Pick<TForm, "id">) => {
	const { id, ...update } = payload;

	await dbTransact(tx.forms[id].update(update));
};

const deleteForm = async (id: TForm["id"]) => {
	dbTransact([tx.forms[id].delete()]);
};

export { createForm, updateForm, deleteForm };
