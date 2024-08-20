import { IconButton } from "@/shared/components/IconButton/IconButton";
import type { FieldTypes } from "@/shared/constants/field";
import { useAddField } from "@/shared/models/field/hooks/useAddField";
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
			<IconButton size="sm" tooltip={tooltip} onClick={modalActions.open}>
				<IconPlus />
			</IconButton>

			<AddBlockModal
				onClose={modalActions.close}
				opened={isModalOpen}
				onAddBlock={handleAddBlock}
			/>
		</>
	);
};
