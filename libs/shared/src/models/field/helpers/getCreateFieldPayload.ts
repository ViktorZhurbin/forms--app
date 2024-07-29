import { id } from "@instantdb/react";
import { QuestionTypesMap } from "~/constants/questionMaps";
import { QuestionTypes } from "~/constants/questions";
import { makeSubId } from "~/utils/makeId";
import type { TQuestion, TQuestionChoice, TQuestionShortText } from "../schema";
import { getChoiceFieldOptionPayload } from "./getChoiceFieldOptionPayload";

const getCreateFieldPayload = ({
	type,
	order,
}: Pick<TQuestion, "type" | "order">) => {
	const basePayload = {
		type,
		order,
		title: "",
		buttonText: "",
		id: id(),
		nanoId: makeSubId(),
		group: QuestionTypesMap[type].group,
	};

	let update = {};

	switch (type) {
		case QuestionTypes.YesNo:
			update = {
				options: [
					getChoiceFieldOptionPayload("Yes"),
					getChoiceFieldOptionPayload("No"),
				],
			} as Pick<TQuestionChoice, "options">;

			break;

		case QuestionTypes.Checkboxes:
		case QuestionTypes.MultipleChoice:
			update = {
				options: [
					getChoiceFieldOptionPayload("Option 1"),
					getChoiceFieldOptionPayload("Option 2"),
				],
			} as Pick<TQuestionChoice, "options">;

			break;

		case QuestionTypes.ShortText:
			update = {
				textPlaceholder: "Your answer here...",
			} as Pick<TQuestionShortText, "textPlaceholder">;

			break;
	}

	return { ...basePayload, ...update } as TQuestion;
};

export { getCreateFieldPayload };
