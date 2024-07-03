import { id, tx } from "@instantdb/react";
import { QuestionTypesMap } from "~/constants/questionMaps";
import { QuestionTypes } from "~/constants/questions";
import { dbTransact } from "../db";
import type { TOption, TQuestion, TQuestionChoice } from "./schema";

const createQuestion = async ({
	formId,
	type,
}: Pick<TQuestion, "formId" | "type">) => {
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
	payload: Partial<TQuestion> & Pick<TQuestion, "id">,
) => {
	const { id, ...update } = payload;

	dbTransact(tx.questions[id].update(update));
};

const updateChoiceOption = (payload: {
	id: TOption["id"];
	questionId: TQuestionChoice["id"];
	allOptions: TQuestionChoice["options"];
	update: Partial<Omit<TOption, "id">>;
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
