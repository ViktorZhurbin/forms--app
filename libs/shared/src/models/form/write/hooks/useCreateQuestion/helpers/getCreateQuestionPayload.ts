import { id } from "@instantdb/react";
import { QuestionTypesMap } from "~/constants/questionMaps";
import { QuestionTypes } from "~/constants/questions";
import { makeSubId } from "~/utils/makeId";
import type {
	TQuestion,
	TQuestionChoice,
	TQuestionShortText,
} from "../../../../../question/schema/question";

const makeChoiceQuestionOption = (
	text = "",
): TQuestionChoice["options"][number] => ({
	text,
	id: id(),
	nanoId: makeSubId(),
});

const getCreateQuestionPayload = ({ type }: Pick<TQuestion, "type">) => {
	const basePayload = {
		type,
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
					makeChoiceQuestionOption("Yes"),
					makeChoiceQuestionOption("No"),
				],
			} as Pick<TQuestionChoice, "options">;

			break;

		case QuestionTypes.Checkboxes:
		case QuestionTypes.MultipleChoice:
			update = {
				options: [
					makeChoiceQuestionOption("Option 1"),
					makeChoiceQuestionOption("Option 2"),
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

export { makeChoiceQuestionOption, getCreateQuestionPayload };
