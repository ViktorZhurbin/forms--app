import type { TField } from "@/shared/models/field/schema";
import type { TResponse } from "@/shared/models/response/schema";
import { formatISODate, getTimeFromISOString } from "@/shared/utils/date";
import { uniqBy } from "es-toolkit";
import { json2csv } from "json-2-csv";
import { FilterTab } from "../constants/filter";

const getCsv = (params: {
	preparedFields: { title: string; id: string }[];
	filter: FilterTab;
	preparedResponses: (TResponse & {
		updated: ReturnType<typeof formatISODate>;
		submitted: ReturnType<typeof formatISODate>;
	})[];
}) => {
	const { preparedFields, preparedResponses, filter } = params;

	const showPartial = filter === FilterTab.Partial;
	const dateField = {
		value: showPartial ? "updated" : "submitted",
		label: showPartial ? "Updated at" : "Submitted at",
	} as const;

	const headers = [
		dateField.label,
		...preparedFields.map(({ title }) => title),
	];

	const rows = preparedResponses.map(({ answers, ...rest }) => {
		const date = rest[dateField.value];
		const dateValue = date ? `${date.date} ${date.time}` : "";

		return [dateValue].concat(
			preparedFields.map(({ id: fieldId }) => {
				const { value } = answers[fieldId] ?? {};

				const stringValue = Array.isArray(value)
					? value.map((item) => item.text).join(", ")
					: value;

				return stringValue;
			}),
		);
	});

	const data = [headers].concat(rows);
	return json2csv(data, { emptyFieldValue: "" });
};

export const getPreparedResponses = (params: {
	fields: TField[];
	responses: TResponse[];
	filter: FilterTab;
}) => {
	const { fields, responses, filter } = params;

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

	const csv = getCsv({
		filter,
		preparedFields,
		preparedResponses,
	});

	return {
		csv,
		preparedFields,
		preparedResponses,
	};
};
