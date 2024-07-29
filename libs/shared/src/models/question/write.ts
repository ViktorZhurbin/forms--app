import { id, lookup, tx } from "@instantdb/react";
import { dbTransact } from "../db";
import type { TForm } from "../form/schema/form";
import type { TQuestion } from "./schema/question";

type CreateQuestionParams = {
	payload: Omit<TQuestion, "id">;
	formNanoId: TForm["nanoId"];
};

const createField = async ({ payload, formNanoId }: CreateQuestionParams) => {
	await dbTransact(
		tx.fields[id()]
			.update(payload)
			.link({ forms: lookup("nanoId", formNanoId) }),
	);

	return payload.nanoId;
};

const updateField = async (
	payload: Partial<TQuestion> & { nanoId: TQuestion["nanoId"] },
) => {
	const { nanoId, ...update } = payload;

	await dbTransact(tx.fields[lookup("nanoId", nanoId)].update(update));
};

const updateFieldsOrder = async (
	orderedFieldsNanoIds: TQuestion["nanoId"][],
) => {
	const ops = orderedFieldsNanoIds.map((nanoId, index) =>
		tx.fields[lookup("nanoId", nanoId)].update({ order: index }),
	);

	await dbTransact(ops);
};

const deleteField = async ({ nanoId }: { nanoId: TQuestion["nanoId"] }) => {
	dbTransact([tx.fields[lookup("nanoId", nanoId)].delete()]);
};

export { createField, updateField, updateFieldsOrder, deleteField };
