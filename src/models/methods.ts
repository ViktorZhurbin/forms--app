import { id, tx } from "@instantdb/react";
import { db } from "./db";
import type { TForm, TQuestion } from "./schema";

export function createForm(form: Omit<TForm, "id">) {
	db.transact(tx.forms[id()].update(form));
}

export function createQuestion(question: Omit<TQuestion, "id">) {
	db.transact(tx.questions[id()].update(question));
}

export function updateQuestion(question: TQuestion) {
	db.transact(tx.questions[question.id].update({ title: !question.title }));
}
