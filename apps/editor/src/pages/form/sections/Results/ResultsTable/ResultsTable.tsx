import type { TField } from "@/shared/models/field/schema";
import type { TResponse } from "@/shared/models/response/schema";
import { Stack, Table } from "@mantine/core";
import { FilterTab } from "../constants/filter";
import { getPreparedResponses } from "../helpers/getPreparedResponses";

export type ResultsTableProps = {
	fields: TField[];
	filter: FilterTab;
	responses: TResponse[];
};

export const ResultsTable = (props: ResultsTableProps) => {
	const { preparedFields, preparedResponses } = getPreparedResponses(props);

	const getHeaders = () => (
		<Table.Tr>
			<Table.Th>{dateField.label}</Table.Th>
			{preparedFields.map(({ id, title, isDeleted }) => {
				const header = `${title}${isDeleted ? " (deleted)" : ""}`;

				return <Table.Th key={id}>{header}</Table.Th>;
			})}
		</Table.Tr>
	);

	const getRows = () => {
		return preparedResponses.map(({ id, answers, ...rest }) => {
			const dateProperty = rest[dateField.value];

			const date = dateProperty ? (
				<Stack gap={0}>
					<span>{dateProperty.date}</span>
					<span>{dateProperty.time}</span>
				</Stack>
			) : null;

			return (
				<Table.Tr key={id}>
					<Table.Td>{date}</Table.Td>
					{preparedFields.map(({ id: fieldId }) => {
						const { value } = answers[fieldId] ?? {};

						const stringValue = Array.isArray(value)
							? value.map((item) => item.text).join(", ")
							: value;

						return <Table.Td key={fieldId}>{stringValue}</Table.Td>;
					})}
				</Table.Tr>
			);
		});
	};

	const showPartial = props.filter === FilterTab.Partial;
	const dateField = {
		value: showPartial ? "updated" : "submitted",
		label: showPartial ? "Updated at" : "Submitted at",
	} as const;

	return (
		<Table.ScrollContainer minWidth="900px">
			<Table
				striped
				stickyHeader
				highlightOnHover
				withColumnBorders
				withTableBorder
				horizontalSpacing="md"
			>
				<Table.Thead>{getHeaders()}</Table.Thead>
				<Table.Tbody>{getRows()}</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	);
};
