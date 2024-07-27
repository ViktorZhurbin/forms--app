import type {
	QuestionGroups,
	QuestionTypes,
} from "../../../constants/questions";

type TQuestionBase = {
	id: string;
	nanoId: string;
	type: QuestionTypes;
	group: QuestionGroups;
	title: string;
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

interface TQuestionMultipleChoice extends TQuestionChoice {
	type: QuestionTypes.MultipleChoice;
}

interface TQuestionMultipleChoiceSingle extends TQuestionChoice {
	type: QuestionTypes.MultipleChoiceSingle;
}

interface TQuestionShortText extends TQuestionBase {
	type: QuestionTypes.ShortText;
	group: QuestionGroups.Text;
	textPlaceholder: string;
}

type TQuestion =
	| TQuestionYesNo
	| TQuestionMultipleChoice
	| TQuestionMultipleChoiceSingle
	| TQuestionShortText;

export type {
	TQuestionBase,
	TQuestion,
	TOption,
	TQuestionYesNo,
	TQuestionChoice,
	TQuestionMultipleChoice,
	TQuestionShortText,
};
