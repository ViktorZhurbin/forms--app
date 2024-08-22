import { FieldTypes } from "~/constants/field";
import type {
	TField,
	TFieldChoice,
	TFieldQuestion,
	TFieldText,
} from "~/models/field/schema";

const isSingleChoiceField = (field: Pick<TField, "type">) => {
	return (
		field.type === FieldTypes.MultipleChoice || field.type === FieldTypes.YesNo
	);
};

const isChoiceField = (field: TField): field is TFieldChoice => {
	return (
		field.type === FieldTypes.Checkboxes ||
		field.type === FieldTypes.MultipleChoice ||
		field.type === FieldTypes.YesNo
	);
};

const isTextField = (field: TField): field is TFieldText => {
	return field.type === FieldTypes.ShortText || field.type === FieldTypes.Email;
};

const isQestionField = (field: TField): field is TFieldQuestion => {
	return isChoiceField(field) || isTextField(field);
};

const isFieldRequired = (field: TField) => {
	return isQestionField(field) && field.settings?.isRequired;
};

export { isSingleChoiceField, isChoiceField, isQestionField, isFieldRequired };
