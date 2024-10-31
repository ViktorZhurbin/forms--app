import { id } from "@instantdb/react";
import { FieldTypes } from "~/constants/field";
import { makeSubId } from "~/utils/makeId";
import type { TField, TFieldChoice, TFieldEnding, TFieldText } from "../schema";
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
		settings: {},
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

		case FieldTypes.Email:
			update = {
				placeholder: "name@example.com",
			} as Pick<TFieldText, "placeholder">;

			break;

		case FieldTypes.Ending:
			update = {
				title: "Thank you",
				description: "Made with Forms, the easy way to make forms.",
				buttonText: "Make your own form",
			} as Partial<TFieldEnding>;

			break;
	}

	return { ...basePayload, ...update } as TField;
};

export { getCreateFieldPayload };
