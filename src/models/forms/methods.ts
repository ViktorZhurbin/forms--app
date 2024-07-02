import { id, tx } from "@instantdb/react";
import { dbTransact } from "../db";
import type { FormType } from "./forms";

export function createForm(form: Omit<FormType, "id">) {
	dbTransact(tx.forms[id()].update(form));
}

export function updateForm(payload: Partial<FormType> & Pick<FormType, "id">) {
	const { id, ...update } = payload;

	dbTransact(tx.forms[id].update(update));
}
