import type { QuestionType } from "~/constants/questions";

type TForm = {
	id: string;
	name: string;
	responseCount: number;
};

type TQuestion = QuestionType;

type TOption = {
	id: string;
	text: string;
};

export type { TForm, TQuestion, TOption };
