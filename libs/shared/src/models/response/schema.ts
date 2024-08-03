import type { TField, TFieldChoice } from "../field/schema";

type TAnswerBase = {
	field: Pick<TField, "id" | "type" | "title">;
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
	answers: Record<TField["id"], TAnswer>;
};

export type { TResponse, TAnswer, TAnswerChoice, TAnswerText };
