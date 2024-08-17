import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { ConfirmationModal } from "~/components/modals/ConfirmationModal/ConfirmationModal";

export const DeleteResponsesButton = (props: {
	buttonText: string;
	onDelete: () => void;
}) => {
	const { buttonText, onDelete } = props;

	const [opened, modalActions] = useDisclosure();

	const handleDelete = () => {
		onDelete();
		modalActions.close();
	};

	return (
		<>
			<Button
				size="xs"
				color="red"
				leftSection={<IconTrash />}
				onClick={modalActions.open}
			>
				{buttonText}
			</Button>

			<ConfirmationModal
				opened={opened}
				onClose={modalActions.close}
				title={`${buttonText}?`}
				text="Are you sure you want to delete selected responses?"
				onConfirm={handleDelete}
				confirmButtontext="Delete"
			/>
		</>
	);
};
