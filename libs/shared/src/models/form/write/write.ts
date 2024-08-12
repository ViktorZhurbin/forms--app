import { id, lookup, tx } from "@instantdb/react";
import type { TWorkspace } from "~/models/workspace/schema/workspace";
import { makeId } from "~/utils/makeId";
import { db } from "../../db";
import type { TForm } from "../schema/form";
import { getDummyFormTitle } from "./helpers";

const createForm = async ({
	isDemo,
	wsNanoId,
}: { wsNanoId?: TWorkspace["id"]; isDemo?: boolean } = {}) => {
	const nanoId = makeId();

	const form: Omit<TForm, "id"> = {
		nanoId,
		isDemo,
		name: getDummyFormTitle(),
	};

	const formId = id();

	await db.transact(tx.forms[formId].update(form));

	if (wsNanoId) {
		db.transact(
			tx.forms[formId].link({ workspaces: lookup("nanoId", wsNanoId) }),
		);
	}

	return nanoId;
};

const updateForm = async (payload: Partial<TForm>) => {
	const { nanoId, ...update } = payload;

	if (!nanoId) return;

	await db.transact(tx.forms[lookup("nanoId", nanoId)].update(update));
};

const deleteForm = async ({ nanoId }: { nanoId: TForm["nanoId"] }) => {
	db.transact([tx.forms[lookup("nanoId", nanoId)].delete()]);
};

const linkFormToWorkspace = async ({
	formId,
	wsNanoId,
}: { formId: TForm["id"]; wsNanoId: TWorkspace["nanoId"] }) => {
	await db.transact(
		tx.forms[formId]
			.link({ workspaces: lookup("nanoId", wsNanoId) })
			.update({ isDemo: false }),
	);
};

export { createForm, updateForm, deleteForm, linkFormToWorkspace };
