import type { FieldGroups, FieldTypes } from "../../constants/questions";

type TFieldBase = {
	id: string;
	nanoId: string;
	type: FieldTypes;
	group: FieldGroups;
	title: string;
	index: number;
	isPublished: boolean;
	buttonText: string;
};

interface TFieldChoice extends TFieldBase {
	group: FieldGroups.Choice;
	options: TOption[];
}

type TOption = {
	id: string;
	text: string;
	nanoId: string;
};

interface TFieldYesNo extends TFieldChoice {
	type: FieldTypes.YesNo;
}

interface TFieldCheckboxes extends TFieldChoice {
	type: FieldTypes.Checkboxes;
}

interface TFieldMultipleChoiceSingle extends TFieldChoice {
	type: FieldTypes.MultipleChoice;
}

interface TFieldShortText extends TFieldBase {
	type: FieldTypes.ShortText;
	group: FieldGroups.Text;
	textPlaceholder: string;
}

type TField =
	| TFieldYesNo
	| TFieldCheckboxes
	| TFieldMultipleChoiceSingle
	| TFieldShortText;

export type {
	TFieldBase,
	TField,
	TOption,
	TFieldYesNo,
	TFieldChoice,
	TFieldCheckboxes,
	TFieldShortText,
};
