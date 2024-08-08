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

interface TFieldChoice extends TFieldBase {
	type: FieldTypes.Checkboxes | FieldTypes.MultipleChoice | FieldTypes.YesNo;
	options: TChoice[];
}

interface TFieldText extends TFieldBase {
	type: FieldTypes.ShortText;
	placeholder: string;
}

interface TFieldInfo extends TFieldBase {
	type: FieldTypes.Welcome | FieldTypes.Ending;
}

type TField = TFieldChoice | TFieldText | TFieldInfo;

export type { TField, TFieldChoice, TFieldText, TFieldInfo };
