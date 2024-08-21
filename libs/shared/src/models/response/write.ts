import { id, lookup, tx } from "@instantdb/react";
import { getNowISOString } from "~/utils/date";
import { db } from "../db";
import type { TForm } from "../form/schema/form";
import type { TAnswer, TResponse } from "./schema";

const createResponse = async (params: {
	answer?: TAnswer;
	formNanoId: TForm["nanoId"];
}) => {
	const { answer, formNanoId } = params;
	const fieldId = answer?.field.id;

	const response: Omit<TResponse, "id"> = {
		answers: fieldId ? { [fieldId]: answer } : {},
		updatedAt: getNowISOString(),
	};

	const responseId: string = id();

	await db.transact([
		tx.responses[responseId]
			.update(response)
			.link({ forms: lookup("nanoId", formNanoId) }),
	]);

	return responseId;
};

const updateResponse = async (params: {
	responseId: TResponse["id"];
	payload: Partial<TResponse>;
}) => {
	const { responseId, payload } = params;

	const update = {
		...payload,
		updatedAt: getNowISOString(),
	};

	await db.transact([tx.responses[responseId].update(update)]);
};

const updateAnswer = async (params: {
	answer: TAnswer;
	responseId: TResponse["id"];
}) => {
	const { responseId, answer } = params;
	const fieldId = answer.field.id;

	await db.transact([
		tx.responses[responseId]
			.merge({ answers: { [fieldId]: answer } })
			.update({ updatedAt: getNowISOString() }),
	]);
};

const deleteResponses = async ({ ids }: { ids: TResponse["id"][] }) => {
	const ops = ids.map((id) => tx.responses[id].delete());

	await db.transact(ops);
};

export { createResponse, updateResponse, updateAnswer, deleteResponses };
