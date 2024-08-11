import type { FieldTypes } from "@/shared/constants/field";
import { useAddField } from "@/shared/models/field/hooks/useAddField";
import { ActionIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useCallback } from "react";
import { navigateToFieldId } from "~/pages/form/utils/navigateToFieldId";
import { AddBlockModal } from "./AddBlockModal/AddBlockModal";

export const AddBlockButton = ({
	tooltip,
	insertBefore,
}: { tooltip: string; insertBefore?: boolean }) => {
	const [isModalOpen, modalActions] = useDisclosure(false);
	const { addField } = useAddField();

	const handleAddBlock = useCallback(
		async (type: FieldTypes) => {
			const { nanoId } = await addField({ type, insertBefore });

			navigateToFieldId({ nanoId });
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
				opened={isModalOpen}
				onAddBlock={handleAddBlock}
			/>
		</>
	);
};
