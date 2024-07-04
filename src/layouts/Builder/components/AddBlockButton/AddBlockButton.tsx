import { ActionIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { AddBlockModal } from "../../modals/AddBlockModal/AddBlockModal";

export const AddBlockButton = ({
	tooltip,
	insertBefore,
}: { tooltip: string; insertBefore?: boolean }) => {
	const [isModalOpen, modalActions] = useDisclosure(false);

	return (
		<>
			<Tooltip withArrow label={tooltip}>
				<ActionIcon variant="default" onClick={modalActions.open}>
					<IconPlus />
				</ActionIcon>
			</Tooltip>

			<AddBlockModal
				insertBefore={insertBefore}
				isOpen={isModalOpen}
				onClose={modalActions.close}
			/>
		</>
	);
};
