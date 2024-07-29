import { id, lookup, tx } from "@instantdb/react";
import { dbTransact } from "../db";
import type { TForm } from "../form/schema/form";
import { getChoiceFieldOptionPayload } from "./helpers/getChoiceFieldOptionPayload";
import type { TQuestion, TQuestionChoice } from "./schema";

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

const updateField = async ({
	id,
	payload,
}: { id: TQuestion["id"]; payload: Partial<TQuestion> }) => {
	await dbTransact(tx.fields[id].update(payload));
};

const createChoiceFieldOption = async ({
	options,
	fieldId,
}: { fieldId: TQuestionChoice["id"]; options: TQuestionChoice["options"] }) => {
	const newOption = getChoiceFieldOptionPayload(`Option ${options.length + 1}`);

	await updateField({
		id: fieldId,
		payload: { options: options.concat(newOption) },
	});

	return newOption.id;
};

const updateManyFields = async (
	fields: { id: TQuestion["id"]; payload: Partial<TQuestion> }[],
) => {
	const ops = fields.map(({ id, payload }) => tx.fields[id].update(payload));

	await dbTransact(ops);
};

const updateFieldsIndex = async (orderedFieldsIds: TQuestion["id"][]) => {
	const ops = orderedFieldsIds.map((id, index) =>
		tx.fields[id].update({ index }),
	);

	await dbTransact(ops);
};

const deleteField = async ({ id }: { id: TQuestion["id"] }) => {
	dbTransact([tx.fields[id].delete()]);
};

export {
	createField,
	createChoiceFieldOption,
	updateField,
	updateManyFields,
	updateFieldsIndex,
	deleteField,
};
