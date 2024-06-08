enum QuestionType {
	YesNo,
	MultipleChoice,
}

type FormField = {
	id: string;
	type: QuestionType;
	title: string;
	options: string[];
};

export { QuestionType };

export type { FormField };
