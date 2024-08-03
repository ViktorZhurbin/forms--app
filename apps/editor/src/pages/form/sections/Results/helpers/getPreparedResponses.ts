import type { TField } from "@/shared/models/field/schema";
import type { TResponse } from "@/shared/models/response/schema";
import { getTimeFromISOString } from "@/shared/utils/date";
import { uniqBy } from "es-toolkit";

export const getPreparedResponses = (params: {
	fields: TField[];
	responses: TResponse[];
}) => {
	const { fields, responses } = params;

	const sortedResponses = responses.toSorted(
		(a, b) =>
			getTimeFromISOString(b.updatedAt) - getTimeFromISOString(a.updatedAt),
	);

	const currentFieldsById = fields?.reduce<Record<string, TField>>(
		(acc, field) => {
			acc[field.id] = field;

			return acc;
		},
		{},
	);

	const allAnswers = sortedResponses.flatMap(({ answers }) =>
		Object.values(answers),
	);
	const uniqueAnswers = uniqBy(allAnswers, ({ field }) => field.id);

	const uniqueSortedFields = uniqueAnswers
		.map(({ field }) => {
			const currentField = currentFieldsById[field.id];

			return {
				id: field.id,
				title: field.title,
				index: currentField?.index,
				isDeleted: !currentField,
			};
		})
		.sort((a, b) => a.index - b.index);

	return {
		uniqueSortedFields,
		sortedResponses,
	};
};
