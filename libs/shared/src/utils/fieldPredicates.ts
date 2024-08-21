import { FieldTypes } from "~/constants/field";
import type {
	TField,
	TFieldChoice,
	TFieldQuestion,
	TFieldText,
} from "~/models/field/schema";

const isChoiceFieldType = (type: FieldTypes) => {
	return (
		type === FieldTypes.Checkboxes ||
		type === FieldTypes.MultipleChoice ||
		type === FieldTypes.YesNo
	);
};

const isTextFieldType = (type: FieldTypes) => {
	return type === FieldTypes.ShortText;
};

const isSingleChoiceFieldType = (type: FieldTypes) => {
	return type === FieldTypes.MultipleChoice || type === FieldTypes.YesNo;
};

const isNonQuestionFieldType = (type: FieldTypes) => {
	return (
		type === FieldTypes.Welcome ||
		type === FieldTypes.Statement ||
		type === FieldTypes.Ending
	);
};

const isQuestionFieldType = (type: FieldTypes) => {
	return type !== FieldTypes.Ending;
};

const isChoiceField = (field: TField): field is TFieldChoice => {
	return isChoiceFieldType(field.type);
};

const isTextField = (field: TField): field is TFieldText => {
	return isTextFieldType(field.type);
};

const isQestionField = (field: TField): field is TFieldQuestion => {
	return isChoiceField(field) || isTextField(field);
};

const isFieldRequired = (field: TField) => {
	return isQestionField(field) && field.settings?.isRequired;
};

export {
	isChoiceFieldType,
	isSingleChoiceFieldType,
	isNonQuestionFieldType,
	isQuestionFieldType,
	isChoiceField,
	isQestionField,
	isFieldRequired,
};
