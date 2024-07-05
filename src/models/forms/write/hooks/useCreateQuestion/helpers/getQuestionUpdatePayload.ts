import { id } from "@instantdb/react";
import { QuestionTypesMap } from "~/constants/questionMaps";
import { QuestionTypes } from "~/constants/questions";
import type { TQuestion } from "../../../../schema/questions";

export const getQuestionUpdatePayload = ({ type }: Pick<TQuestion, "type">) => {
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
			};

			break;

		case QuestionTypes.MultipleChoice:
			update = {
				options: [
					{ id: id(), text: "Option 1" },
					{ id: id(), text: "Option 2" },
				],
			};

			break;
	}

	return { ...updateBase, ...update } as TQuestion;
};
