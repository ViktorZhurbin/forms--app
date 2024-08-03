import type { TField } from "@/shared/models/field/schema";
import type { TResponse } from "@/shared/models/response/schema";
import { Checkbox, Stack, Table } from "@mantine/core";
import { useState } from "react";
import { TableActions } from "../TableActions/TableActions";
import { FilterTab } from "../constants/filter";
import { getPreparedResponses } from "../helpers/getPreparedResponses";

export type ResultsTableProps = {
	fields: TField[];
	filter: FilterTab;
	responses: TResponse[];
};

export const ResultsTable = (props: ResultsTableProps) => {
	const [selectedIds, setSelectedIds] = useState<TResponse["id"][]>([]);

	const { preparedFields, preparedResponses } = getPreparedResponses(props);

	const getHeaders = () => (
		<Table.Tr>
			<Table.Th>
				<Checkbox
					aria-label="Select row"
					checked={selectedIds.length === preparedResponses.length}
					onChange={(event) =>
						setSelectedIds(
							event.currentTarget.checked
								? preparedResponses.map(({ id }) => id)
								: [],
						)
					}
				/>
			</Table.Th>
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

			const isSelected = selectedIds.includes(id);

			return (
				<Table.Tr
					key={id}
					bg={isSelected ? "var(--mantine-color-blue-light)" : undefined}
				>
					<Table.Td>
						<Checkbox
							aria-label="Select row"
							checked={isSelected}
							onChange={(event) =>
								setSelectedIds(
									event.currentTarget.checked
										? selectedIds.concat(id)
										: selectedIds.filter((rowId) => rowId !== id),
								)
							}
						/>
					</Table.Td>
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
		<div>
			<TableActions selectedIds={selectedIds} setSelectedIds={setSelectedIds} />

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
		</div>
	);
};
