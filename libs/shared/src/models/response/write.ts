import { id, lookup, tx } from "@instantdb/react";
import { getNowISOString } from "~/utils/date";
import { dbTransact } from "../db";
import type { TForm } from "../form/schema/form";
import type { TAnswer, TResponse } from "./schema";

const createResponse = async (params: {
	answer: TAnswer;
	formNanoId: TForm["nanoId"];
}) => {
	const { answer, formNanoId } = params;

	const response: Omit<TResponse, "id"> = {
		answers: { [answer.fieldId]: answer },
		updatedAt: getNowISOString(),
	};

	const responseId: string = id();

	await dbTransact([
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

	await dbTransact([tx.responses[responseId].update(update)]);
};

const updateAnswer = async (params: {
	answer: TAnswer;
	responseId: TResponse["id"];
}) => {
	const {
		responseId,
		answer: { fieldId, value },
	} = params;

	await dbTransact([
		tx.responses[responseId]
			.merge({ answers: { [fieldId]: { value: value } } })
			.update({ updatedAt: getNowISOString() }),
	]);
};

export { createResponse, updateResponse, updateAnswer };
