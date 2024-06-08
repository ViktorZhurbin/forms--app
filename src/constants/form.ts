enum QuestionType {
	YesNo = 0,
	MultipleChoice = 1,
}

type FormField = {
	id: string;
	type: QuestionType;
	title: string;
	options: string[];
};

export { QuestionType };

export type { FormField };
