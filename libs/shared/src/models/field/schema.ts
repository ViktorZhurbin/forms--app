import type { FieldTypes } from "../../constants/field";

type TFieldBase = {
	id: string;
	nanoId: string;
	type: FieldTypes;
	title: string;
	description?: string;
	index: number;
	isPublished: boolean;
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

type TInfoSettings = {
	showSmth: boolean;
};

interface TFieldInfo extends TFieldBase {
	type: FieldTypes.Welcome | FieldTypes.Ending;
	// TODO: specify settings object
	settings: TInfoSettings;
}

type TField = TFieldChoice | TFieldText | TFieldInfo;

export type { TField, TFieldChoice, TFieldText, TFieldInfo };
