import { id, tx } from "@instantdb/react";
import { QuestionTypes } from "~/constants/questions";
import { db } from "./db";
import type { TForm, TQuestion } from "./schema";

export function createForm(form: Omit<TForm, "id">) {
	db.transact(tx.forms[id()].update(form));
}

export function createQuestion(question: Omit<TQuestion, "id">) {
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

export function updateQuestion(question: TQuestion) {
	db.transact(tx.questions[question.id].update({ title: !question.title }));
}
