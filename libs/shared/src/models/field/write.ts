import { id, lookup, tx } from "@instantdb/react";
import { objectEntries } from "~/utils/object";
import { db } from "../db";
import type { TForm } from "../form/schema/form";
import { getChoiceFieldOptionPayload } from "./helpers/getChoiceFieldOptionPayload";
import type { TField, TFieldChoice } from "./schema";

type CreateFieldParams = {
	payload: Omit<TField, "id">;
	formNanoId: TForm["nanoId"];
};

const createField = async ({ payload, formNanoId }: CreateFieldParams) => {
	await db.transact(
		tx.fields[id()]
			.update(payload)
			.link({ forms: lookup("nanoId", formNanoId) }),
	);

	return payload.nanoId;
};

const updateField = async ({
	id,
	payload,
}: { id: TField["id"]; payload: Partial<TField> }) => {
	await db.transact(tx.fields[id].update(payload));
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

const updateManyFields = async (
	fields: { id: TField["id"]; payload: Partial<TField> }[],
) => {
	const ops = fields.map(({ id, payload }) => tx.fields[id].update(payload));

	await db.transact(ops);
};

const updateFieldsIndex = async (orderedFieldsIds: TField["id"][]) => {
	const ops = orderedFieldsIds.map((id, index) =>
		tx.fields[id].update({ index }),
	);

	await db.transact(ops);
};

const deleteField = async ({ id }: { id: TField["id"] }) => {
	db.transact([tx.fields[id].delete()]);
};

const updateFieldSetting = async <Field extends TField>(params: {
	field: Field;
	payload: Partial<Field["settings"]>;
}) => {
	const { field, payload } = params;

	const ops = objectEntries(payload).map(([key, value]) =>
		tx.fields[field.id].merge({ settings: { [key]: value } }),
	);

	await db.transact(ops);
};

export {
	createField,
	createChoiceFieldOption,
	updateField,
	updateManyFields,
	updateFieldsIndex,
	updateFieldSetting,
	deleteField,
};
