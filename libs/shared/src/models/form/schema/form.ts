import type { TQuestion } from "./question";

type TForm = {
	id: string;
	nanoId: string;
	name: string;
	responseCount: number;
	questions: TQuestion[];
	draftQuestions: TQuestion[];
	isDemo?: boolean;
};

export type { TForm };
