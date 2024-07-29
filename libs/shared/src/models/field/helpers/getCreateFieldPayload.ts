import { id } from "@instantdb/react";
import { QuestionTypesMap } from "~/constants/fieldMaps";
import { FieldTypes } from "~/constants/fields";
import { makeSubId } from "~/utils/makeId";
import type { TField, TFieldChoice, TFieldShortText } from "../schema";
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
		group: QuestionTypesMap[type].group,
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
				textPlaceholder: "Your answer here...",
			} as Pick<TFieldShortText, "textPlaceholder">;

			break;
	}

	return { ...basePayload, ...update } as TField;
};

export { getCreateFieldPayload };
