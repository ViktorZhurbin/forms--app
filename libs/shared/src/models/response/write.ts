import { id, lookup, tx } from "@instantdb/react";
import { getNowISOString } from "~/utils/date";
import { dbTransact } from "../db";
import type { TForm } from "../form/schema/form";
import type { TResponse } from "./schema";

const createResponse = async ({
	answers,
	formNanoId,
}: { formNanoId: TForm["nanoId"]; answers: TResponse["answers"] }) => {
	const response: Omit<TResponse, "id"> = {
		answers,
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

const updateResponse = async ({
	id,
	payload,
}: {
	id: TResponse["id"];
	payload: Partial<TResponse>;
}) => {
	const update = {
		...payload,
		updatedAt: getNowISOString(),
	};

	await dbTransact([tx.responses[id].update(update)]);
};

export { createResponse, updateResponse };
