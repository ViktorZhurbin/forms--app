import type { TResponse } from "@/shared/models/response/schema";
import type { formatISODate } from "@/shared/utils/date";
import { json2csv } from "json-2-csv";
import { FilterTab } from "../constants/filter";

export const getCsv = (params: {
	preparedFields: { title: string; id: string }[];
	filter: FilterTab;
	selectedIds: TResponse["id"][];
	preparedResponses: (TResponse & {
		updated: ReturnType<typeof formatISODate>;
		submitted: ReturnType<typeof formatISODate>;
	})[];
}) => {
	const { preparedFields, preparedResponses, filter, selectedIds } = params;

	const showPartial = filter === FilterTab.Partial;
	const dateField = {
		value: showPartial ? "updated" : "submitted",
		label: showPartial ? "Updated at" : "Submitted at",
	} as const;

	const headers = [
		dateField.label,
		...preparedFields.map(({ title }) => title),
	];

	const rows = preparedResponses.reduce<{
		all: string[][];
		selected: string[][];
	}>(
		(acc, response) => {
			const { answers, ...rest } = response;

			const date = rest[dateField.value];
			const dateValue = date ? `${date.date} ${date.time}` : "";

			const result = [dateValue].concat(
				preparedFields.map(({ id: fieldId }) => {
					const { value } = answers[fieldId] ?? {};

					const stringValue = Array.isArray(value)
						? value.map((item) => item.text).join(", ")
						: value;

					return stringValue;
				}),
			);

			acc.all.push(result);

			if (selectedIds.includes(response.id)) {
				acc.selected.push(result);
			}

			return acc;
		},
		{
			all: [],
			selected: [],
		},
	);

	const all = [headers].concat(rows.all);
	const selected = [headers].concat(rows.selected);

	return {
		all: json2csv(all, { emptyFieldValue: "" }),
		selected: json2csv(selected, { emptyFieldValue: "" }),
	};
};
