import type { TField } from "../../field/schema";

type TForm = {
	id: string;
	nanoId: string;
	name: string;
	responseCount: number;
	questions: TField[];
	draftQuestions: TField[];
	isDemo?: boolean;
};

export type { TForm };
