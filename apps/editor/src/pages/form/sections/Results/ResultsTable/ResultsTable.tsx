import type { TField } from "@/shared/models/field/schema";
import type { TResponse } from "@/shared/models/response/schema";
import { Table } from "@mantine/core";
import { getPreparedResponses } from "../helpers/getPreparedResponses";

export type ResultsTableProps = {
	fields: TField[];
	responses: TResponse[];
};

export const ResultsTable = (props: ResultsTableProps) => {
	const { preparedFields, preparedResponses } = getPreparedResponses(props);

	const getHeaders = () =>
		preparedFields.map(({ id, title, isDeleted }) => {
			const header = `${title}${isDeleted ? " (deleted)" : ""}`;

			return <Table.Th key={id}>{header}</Table.Th>;
		});

	const getRows = (answers: TResponse["answers"]) =>
		preparedFields.map(({ id: fieldId }) => {
			const { value } = answers[fieldId] ?? {};

			const stringValue = Array.isArray(value)
				? value.map((item) => item.text).join(", ")
				: value;

			return <Table.Td key={fieldId}>{stringValue || "-"}</Table.Td>;
		});

	return (
		<Table
			striped
			highlightOnHover
			withColumnBorders
			withTableBorder
			horizontalSpacing="md"
		>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Submitted at</Table.Th>
					{getHeaders()}
				</Table.Tr>
			</Table.Thead>

			<Table.Tbody>
				{preparedResponses.map(({ id, answers, submittedAt }) => (
					<Table.Tr key={id}>
						<Table.Td>{submittedAt}</Table.Td>
						{getRows(answers)}
					</Table.Tr>
				))}
			</Table.Tbody>
		</Table>
	);
};
