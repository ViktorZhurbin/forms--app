import type { FieldTypes } from "../../constants/field";

type TFieldBase = {
	id: string;
	nanoId: string;
	type: FieldTypes;
	title: string;
	description?: string;
	index: number;
	buttonText: string;
};

type TChoice = {
	id: string;
	text: string;
	nanoId: string;
};

type TSharedQuestonSettings = {
	isRequired: boolean;
};

interface TFieldChoice extends TFieldBase {
	type: FieldTypes.Checkboxes | FieldTypes.MultipleChoice | FieldTypes.YesNo;
	options: TChoice[];
	settings: TSharedQuestonSettings;
}

interface TFieldText extends TFieldBase {
	type: FieldTypes.ShortText | FieldTypes.Email;
	placeholder: string;
	settings: TSharedQuestonSettings;
}

type TFieldQuestion = TFieldChoice | TFieldText;

interface TFieldStatement extends TFieldBase {
	type: FieldTypes.Statement;
	settings: {
		showResponseCount: boolean;
	};
}

/** @deprecated May be restored later */
interface TFieldWelcome extends TFieldBase {
	type: FieldTypes.Welcome;
	settings: {
		showResponseCount: boolean;
	};
}

interface TFieldEnding extends TFieldBase {
	type: FieldTypes.Ending;
	settings: {
		buttonUrl: string;
	};
}

type TField =
	| TFieldChoice
	| TFieldText
	| TFieldWelcome
	| TFieldStatement
	| TFieldEnding;

export type { TField, TFieldQuestion, TFieldChoice, TFieldText, TFieldEnding };
