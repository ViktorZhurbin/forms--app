import { ActionIcon, type ActionIconProps, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { ConfirmationModal } from "~/components/modals/ConfirmationModal/ConfirmationModal";

export const DeleteResponsesButton = (
	props: {
		tooltip: string;
		onDelete: () => void;
	} & Partial<ActionIconProps>,
) => {
	const { tooltip, onDelete, ...actionIconProps } = props;

	const [opened, modalActions] = useDisclosure();

	const handleDelete = () => {
		onDelete();
		modalActions.close();
	};

	return (
		<>
			<Tooltip withArrow label={tooltip}>
				<ActionIcon {...(actionIconProps || {})} onClick={modalActions.open}>
					<IconTrash />
				</ActionIcon>
			</Tooltip>

			<ConfirmationModal
				opened={opened}
				onClose={modalActions.close}
				title={`${tooltip}?`}
				text="Are you sure you want to delete selected responses?"
				onConfirm={handleDelete}
				confirmButtontext="Delete"
			/>
		</>
	);
};
