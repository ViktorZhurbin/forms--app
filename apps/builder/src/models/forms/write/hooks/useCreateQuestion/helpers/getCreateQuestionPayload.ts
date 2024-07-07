import { id } from "@instantdb/react";
import { QuestionTypesMap } from "~/constants/questionMaps";
import { QuestionTypes } from "~/constants/questions";
import type {
	TQuestion,
	TQuestionChoice,
	TQuestionShortText,
} from "../../../../schema/questions";

export const getCreateQuestionPayload = ({ type }: Pick<TQuestion, "type">) => {
	const updateBase = {
		type,
		title: "",
		id: id(),
		group: QuestionTypesMap[type].group,
	};

	let update = {};

	switch (type) {
		case QuestionTypes.YesNo:
			update = {
				options: [
					{ id: id(), text: "Yes" },
					{ id: id(), text: "No" },
				],
			} as Pick<TQuestionChoice, "options">;

			break;

		case QuestionTypes.MultipleChoice:
			update = {
				options: [
					{ id: id(), text: "Option 1" },
					{ id: id(), text: "Option 2" },
				],
			} as Pick<TQuestionChoice, "options">;

			break;

		case QuestionTypes.ShortText:
			update = {
				textPlaceholder: "Your answer here...",
			} as Pick<TQuestionShortText, "textPlaceholder">;

			break;
	}

	return { ...updateBase, ...update } as TQuestion;
};
