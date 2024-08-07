import { id } from "@instantdb/react";
import { FieldTypes } from "~/constants/field";
import { makeSubId } from "~/utils/makeId";
import type { TField, TFieldChoice, TFieldText } from "../schema";
import { getChoiceFieldOptionPayload } from "./getChoiceFieldOptionPayload";

const getCreateFieldPayload = ({
	type,
	index,
}: Pick<TField, "type" | "index">) => {
	const basePayload = {
		type,
		index,
		title: "",
		buttonText: "",
		id: id(),
		nanoId: makeSubId(),
	};

	let update = {};

	switch (type) {
		case FieldTypes.YesNo:
			update = {
				options: [
					getChoiceFieldOptionPayload("Yes"),
					getChoiceFieldOptionPayload("No"),
				],
			} as Pick<TFieldChoice, "options">;

			break;

		case FieldTypes.Checkboxes:
		case FieldTypes.MultipleChoice:
			update = {
				options: [
					getChoiceFieldOptionPayload("Option 1"),
					getChoiceFieldOptionPayload("Option 2"),
				],
			} as Pick<TFieldChoice, "options">;

			break;

		case FieldTypes.ShortText:
			update = {
				placeholder: "Your answer here...",
			} as Pick<TFieldText, "placeholder">;

			break;
	}

	return { ...basePayload, ...update } as TField;
};

export { getCreateFieldPayload };
