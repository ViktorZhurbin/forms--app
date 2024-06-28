import type { QuestionGroups, QuestionTypes } from "~/constants/questions";
import type { FormType } from "../forms/forms";

type QuestionBaseType = {
	id: string;
	formId: FormType["id"];
	type: QuestionTypes;
	group: QuestionGroups;
	title: string;
};

interface ChoiceType extends QuestionBaseType {
	group: QuestionGroups.Choice;
	options: OptionType[];
}

type OptionType = {
	id: string;
	text: string;
};

interface YesNoType extends ChoiceType {
	type: QuestionTypes.YesNo;
}

interface MultipleChoiceType extends ChoiceType {
	type: QuestionTypes.MultipleChoice;
}

interface ShortTextType extends QuestionBaseType {
	type: QuestionTypes.ShortText;
	group: QuestionGroups.Text;
}

type QuestionType = YesNoType | MultipleChoiceType | ShortTextType;

export type {
	QuestionBaseType,
	QuestionType,
	YesNoType,
	ChoiceType,
	MultipleChoiceType,
	ShortTextType,
};
