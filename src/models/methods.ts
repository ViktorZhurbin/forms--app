import { id, tx } from "@instantdb/react";
import { QuestionTypes } from "~/constants/questions";
import { db } from "./db";
import type { FormType } from "./forms/forms";
import type {
	ChoiceType,
	OptionType,
	QuestionType,
} from "./questions/questions";

export function createForm(form: Omit<FormType, "id">) {
	db.transact(tx.forms[id()].update(form));
}

export function createQuestion(question: Omit<QuestionType, "id">) {
	const questionId = id();
	const item = tx.questions[questionId];

	switch (question.type) {
		case QuestionTypes.YesNo:
			db.transact(
				item.update({
					...question,
					options: [
						{ id: id(), text: "Yes" },
						{ id: id(), text: "No" },
					],
				}),
			);
			break;

		case QuestionTypes.MultipleChoice:
			db.transact(
				item.update({
					...question,
					options: [
						{ id: id(), text: "Option 1" },
						{ id: id(), text: "Option 2" },
					],
				}),
			);
			break;

		case QuestionTypes.ShortText:
			db.transact(item.update(question));
			break;
	}
}

export function updateQuestion(
	payload: Partial<QuestionType> & Pick<QuestionType, "id">,
) {
	const { id, ...update } = payload;

	db.transact(tx.questions[id].update(update));
}

export function updateChoiceOption(
	payload: Partial<OptionType> &
		Pick<OptionType, "id"> & {
			questionId: ChoiceType["id"];
			options: ChoiceType["options"];
		},
) {
	const { id, questionId, options, ...update } = payload;
	const newOptions = options.map((option) => {
		if (option.id === id) {
			return { ...option, ...update };
		}

		return option;
	});

	db.transact(tx.questions[questionId].update({ options: newOptions }));
}
