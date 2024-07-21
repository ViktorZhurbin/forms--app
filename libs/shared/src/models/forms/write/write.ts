import { id, lookup, tx } from "@instantdb/react";
import type { TWorkspace } from "~/models/workspace/schema/workspace";
import { makeId } from "~/utils/nanoid";
import { dbTransact } from "../../db";
import type { TForm } from "../schema/forms";
import { getDummyFormTitle } from "./helpers";

const createForm = async ({
	workspaceId,
}: { workspaceId?: TWorkspace["id"] } = {}) => {
	const nanoid = makeId();

	const form: Partial<TForm> = {
		nanoid,
		name: getDummyFormTitle(),
		responseCount: 0,
		questions: [],
		draftQuestions: [],
	};

	const formId = id();

	await dbTransact(tx.forms[formId].update(form));

	if (workspaceId) {
		dbTransact(tx.forms[formId].link({ workspaces: workspaceId }));
	}

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
