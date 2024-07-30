import type { FieldTypes } from "@/shared/constants/field";
import { useAddField } from "@/shared/models/field/hooks/useAddField";
import { ActionIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useCallback } from "react";
import { AddBlockModal } from "../../modals/AddBlockModal/AddBlockModal";
import { navigateToQuestion } from "../../utils/navigateToQuestion";

export const AddBlockButton = ({
	tooltip,
	insertBefore,
}: { tooltip: string; insertBefore?: boolean }) => {
	const [isModalOpen, modalActions] = useDisclosure(false);
	const { addField } = useAddField();

	const handleAddBlock = useCallback(
		async (type: FieldTypes) => {
			const { nanoId } = await addField({ type, insertBefore });

			navigateToQuestion({ nanoId });
			modalActions.close();
		},
		[insertBefore, modalActions.close, addField],
	);

	return (
		<>
			<Tooltip withArrow label={tooltip}>
				<ActionIcon variant="default" onClick={modalActions.open}>
					<IconPlus />
				</ActionIcon>
			</Tooltip>

			<AddBlockModal
				onClose={modalActions.close}
				isOpen={isModalOpen}
				onAddBlock={handleAddBlock}
			/>
		</>
	);
};
