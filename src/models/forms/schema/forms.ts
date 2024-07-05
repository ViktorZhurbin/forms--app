import type { TQuestion } from "./questions";

type TForm = {
	id: string;
	name: string;
	responseCount: number;
	questions: TQuestion[];
};

export type { TForm };
