import type { TQuestion } from "./questions";

type TForm = {
	id: string;
	name: string;
	responseCount: number;
	questions: TQuestion[];
	draftQuestions: TQuestion[];
};

export type { TForm };
