import type { TField, TFieldChoice } from "../field/schema";

type TAnswerBase = {
	fieldId: TField["id"];
	type: TField["type"];
};

interface TAnswerChoice extends TAnswerBase {
	value: TFieldChoice["options"];
}

interface TAnswerText extends TAnswerBase {
	value: string;
}

type TAnswer = TAnswerChoice | TAnswerText;

type TResponse = {
	id: string;
	submittedAt?: string;
	updatedAt: string;
	answers: TAnswer[];
};

export type { TResponse, TAnswer, TAnswerChoice, TAnswerText };
