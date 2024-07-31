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

export type TAnswer = TAnswerChoice | TAnswerText;

export type TResponse = {
	id: string;
	submittedAt?: string;
	updatedAt: string;
	answers: TAnswer[];
};
