import { id } from "@instantdb/react";
import type { TFieldChoice } from "~/models/field/schema";
import { makeSubId } from "~/utils/makeId";

export const getChoiceFieldOptionPayload = (
	text = "",
): TFieldChoice["options"][number] => ({
	text,
	id: id(),
	nanoId: makeSubId(),
});
