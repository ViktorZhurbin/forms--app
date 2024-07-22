import { id, lookup, tx } from "@instantdb/react";
import type { TWorkspace } from "~/models/workspace/schema/workspace";
import { makeId } from "~/utils/nanoid";
import { dbTransact } from "../../db";
import type { TForm } from "../schema/forms";
import { getDummyFormTitle } from "./helpers";

const createForm = async ({
	isDemo,
	wsNanoId,
}: { wsNanoId?: TWorkspace["id"]; isDemo?: boolean } = {}) => {
	const nanoid = makeId();

	const form: Omit<TForm, "id"> = {
		nanoid,
		isDemo,
		name: getDummyFormTitle(),
		responseCount: 0,
		questions: [],
		draftQuestions: [],
	};

	const formId = id();

	await dbTransact(tx.forms[formId].update(form));

	if (wsNanoId) {
		dbTransact(
			tx.forms[formId].link({ workspaces: lookup("nanoid", wsNanoId) }),
		);
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

const linkFormToWorkspace = async ({
	formId,
	wsNanoId,
}: { formId: TForm["id"]; wsNanoId: TWorkspace["id"] }) => {
	await dbTransact(
		tx.forms[formId]
			.link({ workspaces: lookup("nanoid", wsNanoId) })
			.merge({ isDemo: false }),
	);
};

export { createForm, updateForm, deleteForm, linkFormToWorkspace };
