import type { TResponse } from "@/shared/models/response/schema";
import { pluralize } from "@/shared/utils/grammar";
import { Group } from "@mantine/core";
import { DeleteResponsesButton } from "./DeleteResponsesButton/DeleteResponsesButton";
import { DownloadCsvButton } from "./DownloadCsvButton/DownloadCsvButton";

export const TableActions = (props: {
	csv: string;
	selectedIds: TResponse["id"][];
	onDelete: () => void;
}) => {
	const { selectedIds, csv, onDelete } = props;

	const selectedRowsText = pluralize({
		singular: "response",
		count: selectedIds.length,
	});

	return (
		<Group justify="space-between" gap={8} my={8} h={36}>
			{selectedIds.length > 0 ? (
				<DeleteResponsesButton
					buttonText={`Delete ${selectedRowsText}`}
					onDelete={onDelete}
				/>
			) : null}

			<div />

			<DownloadCsvButton csv={csv} />
		</Group>
	);
};
