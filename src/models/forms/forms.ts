import type { QuestionType } from "../questions/questions";

type FormType = {
	id: string;
	name: string;
	responseCount: number;
	orderedQuestionIds: QuestionType["id"][];
};

export type { FormType };
