import { id, tx } from "@instantdb/react";
import { QuestionTypesMap } from "~/constants/questionMaps";
import { QuestionTypes } from "~/constants/questions";
import { dbTransact } from "../db";
import type { ChoiceType, OptionType, QuestionType } from "./questions";

const createQuestion = async ({
	formId,
	type,
}: Pick<QuestionType, "formId" | "type">) => {
	const questionId = id();
	const dbQuestion = tx.questions[questionId];

	const updateBase = {
		formId,
		type,
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

	await dbTransact(dbQuestion.update({ ...updateBase, ...update }));
};

const updateQuestion = (
	payload: Partial<QuestionType> & Pick<QuestionType, "id">,
) => {
	const { id, ...update } = payload;

	dbTransact(tx.questions[id].update(update));
};

const updateChoiceOption = (payload: {
	id: OptionType["id"];
	update: Partial<Omit<OptionType, "id">>;
	questionId: ChoiceType["id"];
	allOptions: ChoiceType["options"];
}) => {
	const { id, questionId, allOptions, update } = payload;

	const newOptions = allOptions.map((option) => {
		if (option.id === id) {
			return { ...option, ...update };
		}

		return option;
	});

	dbTransact(tx.questions[questionId].update({ options: newOptions }));
};

export { createQuestion, updateQuestion, updateChoiceOption };
