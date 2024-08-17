import type { TField } from "@/shared/models/field/schema";
import type { TResponse } from "@/shared/models/response/schema";
import { formatISODate, getTimeFromISOString } from "@/shared/utils/date";
import { uniqBy } from "es-toolkit";

export const getPreparedResponses = (params: {
	fields: TField[];
	responses: TResponse[];
}) => {
	const { fields, responses } = params;

	const preparedResponses = responses
		.map((response) => {
			const submitted = formatISODate(response.submittedAt);
			const updated = formatISODate(response.updatedAt);

			return { ...response, submitted, updated };
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
			const isDeleted = !currentField;
			const title = `${field.title}${isDeleted ? " (deleted)" : ""}`;

			return {
				title,
				id: field.id,
				index: currentField?.index,
			};
		})
		.sort((a, b) => a.index - b.index);

	return {
		preparedFields,
		preparedResponses,
	};
};
