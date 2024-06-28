import type { FormType } from "./forms";

enum QuestionTypes {
	YesNo = "YesNo",
	MultipleChoice = "MultipleChoice",
	ShortText = "ShortText",
}

enum QuestionGroups {
	Choice = "choice",
	Text = "text",
}

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
	group: QuestionGroups.Choice;
}

interface MultipleChoiceType extends ChoiceType {
	type: QuestionTypes.MultipleChoice;
	group: QuestionGroups.Choice;
}

interface ShortTextType extends QuestionBaseType {
	type: QuestionTypes.ShortText;
	group: QuestionGroups.Text;
}

type QuestionType = YesNoType | MultipleChoiceType | ShortTextType;

export { QuestionTypes, QuestionGroups };

export type {
	QuestionBaseType,
	QuestionType,
	YesNoType,
	ChoiceType,
	MultipleChoiceType,
	ShortTextType,
};
