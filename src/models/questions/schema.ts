import type { QuestionGroups, QuestionTypes } from "~/constants/questions";
import type { TForm } from "../forms/schema";

type TQuestionBase = {
	id: string;
	formId: TForm["id"];
	type: QuestionTypes;
	group: QuestionGroups;
	title: string;
	order: number;
};

interface TQuestionChoice extends TQuestionBase {
	group: QuestionGroups.Choice;
	options: TOption[];
}

type TOption = {
	id: string;
	text: string;
};

interface TQuestionYesNo extends TQuestionChoice {
	type: QuestionTypes.YesNo;
}

interface TQuestionMultipleChoice extends TQuestionChoice {
	type: QuestionTypes.MultipleChoice;
}

interface TQuestionShortText extends TQuestionBase {
	type: QuestionTypes.ShortText;
	group: QuestionGroups.Text;
}

type TQuestion = TQuestionYesNo | TQuestionMultipleChoice | TQuestionShortText;

export type {
	TQuestionBase,
	TQuestion,
	TOption,
	TQuestionYesNo,
	TQuestionChoice,
	TQuestionMultipleChoice,
	TQuestionShortText,
};
