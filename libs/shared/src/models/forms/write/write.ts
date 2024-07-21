import { id, lookup, tx } from "@instantdb/react";
import { makeId } from "~/utils/nanoid";
import { dbTransact } from "../../db";
import type { TForm } from "../schema/forms";
import { getDummyFormTitle } from "./helpers";

const createForm = async () => {
	const nanoid = makeId();

	const form: Partial<TForm> = {
		nanoid,
		name: getDummyFormTitle(),
		responseCount: 0,
		questions: [],
		draftQuestions: [],
	};

	await dbTransact(tx.forms[id()].update(form));

	return nanoid;
};

const updateForm = async (payload: Partial<TForm>) => {
	const { nanoid, ...update } = payload;

	if (!nanoid) return;

	await dbTransact(tx.forms[lookup("nanoid", nanoid)].update(update));
};

const deleteForm = async ({ nanoid }: { nanoid: TForm["nanoid"] }) => {
	dbTransact([tx.forms[lookup("nanoid", nanoid)].delete()]);
};

export { createForm, updateForm, deleteForm };
