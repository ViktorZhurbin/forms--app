import type { TField } from "@/shared/models/field/schema";
import { getTimeFromISOString } from "@/shared/utils/date";
import { uniqBy } from "es-toolkit";
import type { ResultsTableProps } from "../ResultsTable/ResultsTable";

export const getPreparedResponses = (params: ResultsTableProps) => {
	const { fields, responses } = params;

	const preparedResponses = responses.toSorted(
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

	const allAnswers = preparedResponses.flatMap(({ answers }) =>
		Object.values(answers),
	);
	const uniqueAnswers = uniqBy(allAnswers, ({ field }) => field.id);

	const preparedFields = uniqueAnswers
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
		preparedFields,
		preparedResponses,
	};
};
