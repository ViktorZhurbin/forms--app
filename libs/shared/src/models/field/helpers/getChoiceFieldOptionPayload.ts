import { id } from "@instantdb/react";
import type { TQuestionChoice } from "~/models/field/schema";
import { makeSubId } from "~/utils/makeId";

export const getChoiceFieldOptionPayload = (
	text = "",
): TQuestionChoice["options"][number] => ({
	text,
	id: id(),
	nanoId: makeSubId(),
});
