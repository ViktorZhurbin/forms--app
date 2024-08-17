import type { TResponse } from "@/shared/models/response/schema";
import { pluralize } from "@/shared/utils/grammar";
import { Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { ConfirmationModal } from "~/components/modals/ConfirmationModal/ConfirmationModal";
import { DownloadCsvButton } from "./DownloadCsvButton/DownloadCsvButton";

export const TableActions = (props: {
	csv: string;
	selectedIds: TResponse["id"][];
	onDelete: () => void;
}) => {
	const { selectedIds, csv, onDelete } = props;

	const [opened, modalActions] = useDisclosure();

	const handleDelete = () => {
		onDelete();
		modalActions.close();
	};

	const selectedRowsText = pluralize({
		singular: "response",
		count: selectedIds.length,
	});

	return (
		<Group justify="space-between" gap={8} my={8} h={36}>
			{selectedIds.length > 0 && (
				<>
					<Button
						size="xs"
						color="red"
						leftSection={<IconTrash />}
						onClick={modalActions.open}
					>
						Detele {selectedRowsText}
					</Button>

					<ConfirmationModal
						opened={opened}
						onClose={modalActions.close}
						title={`Delete ${selectedRowsText}?`}
						text="Are you sure you want to delete selected responses?"
						onConfirm={handleDelete}
						confirmButtontext="Delete"
					/>
				</>
			)}
			<div />
			<DownloadCsvButton csv={csv} />
		</Group>
	);
};
