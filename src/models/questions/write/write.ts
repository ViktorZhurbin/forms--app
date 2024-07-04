import { tx } from "@instantdb/react";
import { dbTransact } from "../../db";
import type { TOption, TQuestion, TQuestionChoice } from "../schema";

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

const deleteQuestion = async (id: TQuestion["id"]) => {
	await dbTransact([tx.forms[id].delete()]);
};

export { updateQuestion, updateChoiceOption, deleteQuestion };
