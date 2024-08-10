import type { TField } from "~/models/field/schema";

const getOrderedFields = (fields: TField[] = []) => {
	return fields?.toSorted((a, b) => a.index - b.index);
};

export { getOrderedFields };
