enum QuestionType {
	YesNo = "YesNo",
	MultipleChoice = "MultipleChoice",
	ShortText = "ShortText",
}

enum QuestionGroup {
	Choice = "Choice",
	Text = "Text",
}

type QuestionBaseType = {
	id: string;
	type: QuestionType;
	group: QuestionGroup;
	title: string;
};

interface YesNoType extends QuestionBaseType {
	type: QuestionType.YesNo;
	group: QuestionGroup.Choice;
	options: ["Yes", "No"];
}

interface MultipleChoiceType extends QuestionBaseType {
	type: QuestionType.MultipleChoice;
	group: QuestionGroup.Choice;
	options: string[];
}

interface ShortTextType extends QuestionBaseType {
	type: QuestionType.ShortText;
	group: QuestionGroup.Text;
}

type Question = YesNoType | MultipleChoiceType | ShortTextType;

export { QuestionType, QuestionGroup };

export type {
	QuestionBaseType,
	Question,
	YesNoType,
	MultipleChoiceType,
	ShortTextType,
};
