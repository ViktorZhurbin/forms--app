import type { TQuestion } from "../questions/schema";

type TForm = {
	id: string;
	name: string;
	responseCount: number;
	orderedQuestionIds: TQuestion["id"][];
};

export type { TForm };
