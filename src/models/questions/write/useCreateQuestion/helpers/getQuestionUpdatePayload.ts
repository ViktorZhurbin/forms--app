import { id } from "@instantdb/react";
import { QuestionTypesMap } from "~/constants/questionMaps";
import { QuestionTypes } from "~/constants/questions";
import type { TQuestion } from "../../../schema";

export const getQuestionUpdatePayload = ({
	formId,
	type,
	order,
}: Pick<TQuestion, "formId" | "type" | "order">) => {
	const updateBase = {
		formId,
		type,
		order,
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

	return { ...updateBase, ...update };
};
