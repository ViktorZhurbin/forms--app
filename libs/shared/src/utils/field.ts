import { FieldTypes } from "~/constants/field";
import type { TField, TFieldEnding } from "~/models/field/schema";

const getOrderedFields = (fields: TField[] = []) => {
	return fields?.toSorted((a, b) => a.index - b.index);
};

const getFieldsAndEndings = (allFields: TField[] = []) => {
	const { fields, endings } = getOrderedFields(allFields).reduce<{
		fields: TField[];
		endings: TFieldEnding[];
	}>(
		(acc, field) => {
			if (field.type === FieldTypes.Ending) {
				acc.endings.push(field);
			} else {
				acc.fields.push(field);
			}

			return acc;
		},
		{ fields: [], endings: [] },
	);

	return {
		fields,
		endings,
		fieldsAndEndings: fields.concat(endings),
	};
};

export { getOrderedFields, getFieldsAndEndings };
