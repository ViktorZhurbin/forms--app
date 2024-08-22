import type { TField, TFieldChoice, TFieldText } from "../field/schema";

type TAnswerBase<T extends TField = TField> = {
	field: Pick<T, "id" | "type" | "title">;
};

interface TAnswerChoice<T extends TFieldChoice = TFieldChoice>
	extends TAnswerBase<T> {
	value: TFieldChoice["options"];
}

interface TAnswerText<T extends TFieldText = TFieldText>
	extends TAnswerBase<T> {
	value: string;
}

type TAnswer<T extends TField = TField> = T extends TFieldChoice
	? TAnswerChoice<T>
	: T extends TFieldText
		? TAnswerText<T>
		: never;

type TResponse = {
	id: string;
	submittedAt?: string;
	updatedAt: string;
	answers: Record<TField["id"], TAnswer>;
};

export type { TResponse, TAnswer, TAnswerChoice, TAnswerText };
