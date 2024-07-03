import type { QuestionType } from "../questions/questions";

type FormType = {
	id: string;
	name: string;
	responseCount: number;
	orderedQuestions: QuestionType["id"][];
};

export type { FormType };
