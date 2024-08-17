import type { TResponse } from "@/shared/models/response/schema";
import { pluralize } from "@/shared/utils/grammar";
import { Group, Text } from "@mantine/core";
import { DeleteResponsesButton } from "./DeleteResponsesButton/DeleteResponsesButton";
import { DownloadCsvButton } from "./DownloadCsvButton/DownloadCsvButton";

export const TableActions = (props: {
	csvAll: string;
	csvSelected: string;
	selectedIds: TResponse["id"][];
	onDelete: () => void;
}) => {
	const { selectedIds, csvAll, csvSelected, onDelete } = props;

	const selectedRowsText = pluralize({
		singular: "response",
		count: selectedIds.length,
	});

	return (
		<Group justify="space-between" gap={8} my={8} h={36}>
			{selectedIds.length > 0 ? (
				<Group gap={8}>
					<Text size="sm">Selected {selectedRowsText}</Text>
					<DeleteResponsesButton
						variant="light"
						color="red"
						tooltip={`Delete ${selectedRowsText}`}
						onDelete={onDelete}
					/>
					<DownloadCsvButton
						variant="light"
						color="dark"
						tooltip={`Download ${selectedRowsText}`}
						csv={csvSelected}
					/>
				</Group>
			) : null}

			<div />

			<DownloadCsvButton tooltip="Download all responses" csv={csvAll} />
		</Group>
	);
};
