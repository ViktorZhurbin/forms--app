import type { TField } from "@/shared/models/field/schema";
import { getTimeFromISOString } from "@/shared/utils/date";
import { uniqBy } from "es-toolkit";
import type { ResultsTableProps } from "../ResultsTable/ResultsTable";
import { FilterTab } from "../constants/filter";

export const getPreparedResponses = (params: ResultsTableProps) => {
	const { fields, responses, filter } = params;

	const preparedResponses = responses
		.filter((response) => {
			if (filter === FilterTab.Completed) {
				return response.submittedAt;
			}
			if (filter === FilterTab.Partial) {
				return !response.submittedAt;
			}

			return true;
		})
		.toSorted(
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
