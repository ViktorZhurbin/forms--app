import { id } from "@instantdb/react";
import { QuestionTypesMap } from "~/constants/questionMaps";
import { QuestionTypes } from "~/constants/questions";
import { makeSubId } from "~/utils/makeId";
import type {
	TQuestion,
	TQuestionChoice,
	TQuestionShortText,
} from "../../../../schema/questions";

const makeChoiceQuestionOption = (
	text = "",
): TQuestionChoice["options"][number] => ({
	text,
	id: id(),
	nanoId: makeSubId(),
});

const getCreateQuestionPayload = ({ type }: Pick<TQuestion, "type">) => {
	const updateBase = {
		type,
		title: "",
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

		case QuestionTypes.MultipleChoice:
		case QuestionTypes.MultipleChoiceSingle:
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

	return { ...updateBase, ...update } as TQuestion;
};

export { makeChoiceQuestionOption, getCreateQuestionPayload };
