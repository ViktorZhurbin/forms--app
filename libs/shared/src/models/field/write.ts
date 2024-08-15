import { id, lookup, tx } from "@instantdb/react";
import { objectEntries } from "~/utils/object";
import { db } from "../db";
import type { TForm } from "../form/schema/form";
import { getChoiceFieldOptionPayload } from "./helpers/getChoiceFieldOptionPayload";
import type { TField, TFieldChoice } from "./schema";

const createField = async (params: {
	newField: Omit<TField, "id">;
	formNanoId: TForm["nanoId"];
	updateFieldIndecies: Pick<TField, "id" | "index">[];
}) => {
	const { newField, formNanoId, updateFieldIndecies } = params;

	const updateOrderOps = updateFieldIndecies.map(({ id, index }) =>
		tx.draftFields[id].update({ index }),
	);

	const createFieldOp = tx.draftFields[id()]
		.update(newField)
		.link({ forms: lookup("nanoId", formNanoId) });

	await db.transact([createFieldOp].concat(updateOrderOps));

	return newField.nanoId;
};

const updateField = async ({
	id,
	payload,
}: { id: TField["id"]; payload: Partial<TField> }) => {
	await db.transact(tx.draftFields[id].update(payload));
};

const createChoiceFieldOption = async ({
	options,
	fieldId,
}: { fieldId: TFieldChoice["id"]; options: TFieldChoice["options"] }) => {
	const newOption = getChoiceFieldOptionPayload(`Option ${options.length + 1}`);

	await updateField({
		id: fieldId,
		payload: { options: options.concat(newOption) },
	});

	return newOption.id;
};

const publishFormFields = async (params: {
	formNanoId: TForm["nanoId"];
	draftFields: { id: TField["id"] & Partial<TField> }[];
}) => {
	const { formNanoId, draftFields } = params;

	const ops = draftFields.map(({ id, ...payload }) =>
		tx.fields[id].update(payload).link({ forms: lookup("nanoId", formNanoId) }),
	);

	await db.transact(ops);
};

const updateFieldsIndex = async (orderedFieldsIds: TField["id"][]) => {
	const ops = orderedFieldsIds.map((id, index) =>
		tx.draftFields[id].update({ index }),
	);

	await db.transact(ops);
};

const deleteField = async ({ id }: { id: TField["id"] }) => {
	db.transact([tx.draftFields[id].delete()]);
};

const updateFieldSetting = async <Field extends TField>(params: {
	field: Field;
	payload: Partial<Field["settings"]>;
}) => {
	const { field, payload } = params;

	const ops = objectEntries(payload).map(([key, value]) =>
		tx.draftFields[field.id].merge({ settings: { [key]: value } }),
	);

	await db.transact(ops);
};

export {
	createField,
	createChoiceFieldOption,
	updateField,
	publishFormFields,
	updateFieldsIndex,
	updateFieldSetting,
	deleteField,
};
