import type { QuestionGroups, QuestionTypes } from "../../constants/questions";

type TQuestionBase = {
	id: string;
	nanoId: string;
	type: QuestionTypes;
	group: QuestionGroups;
	title: string;
	order: number;
	isPublished: boolean;
	buttonText: string;
};

interface TQuestionChoice extends TQuestionBase {
	group: QuestionGroups.Choice;
	options: TOption[];
}

type TOption = {
	id: string;
	text: string;
	nanoId: string;
};

interface TQuestionYesNo extends TQuestionChoice {
	type: QuestionTypes.YesNo;
}

interface TQuestionCheckboxes extends TQuestionChoice {
	type: QuestionTypes.Checkboxes;
}

interface TQuestionMultipleChoiceSingle extends TQuestionChoice {
	type: QuestionTypes.MultipleChoice;
}

interface TQuestionShortText extends TQuestionBase {
	type: QuestionTypes.ShortText;
	group: QuestionGroups.Text;
	textPlaceholder: string;
}

type TQuestion =
	| TQuestionYesNo
	| TQuestionCheckboxes
	| TQuestionMultipleChoiceSingle
	| TQuestionShortText;

export type {
	TQuestionBase,
	TQuestion,
	TOption,
	TQuestionYesNo,
	TQuestionChoice,
	TQuestionCheckboxes,
	TQuestionShortText,
};
