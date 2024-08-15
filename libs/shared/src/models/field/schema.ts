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
	type: FieldTypes.ShortText;
	placeholder: string;
	settings: TSharedQuestonSettings;
}

interface TFieldWelcome extends TFieldBase {
	type: FieldTypes.Welcome;
	settings: {
		showResponseCount: boolean;
	};
}

interface TFieldEnding extends TFieldBase {
	type: FieldTypes.Ending;
	settings: {
		showButton: boolean;
	};
}

type TField = TFieldChoice | TFieldText | TFieldWelcome | TFieldEnding;

export type { TField, TFieldChoice, TFieldText };
