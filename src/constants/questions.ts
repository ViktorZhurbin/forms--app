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

interface YesNoType extends QuestionBaseType {
	type: QuestionTypes.YesNo;
	group: QuestionGroups.Choice;
}

interface MultipleChoiceType extends QuestionBaseType {
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
	MultipleChoiceType,
	ShortTextType,
};
