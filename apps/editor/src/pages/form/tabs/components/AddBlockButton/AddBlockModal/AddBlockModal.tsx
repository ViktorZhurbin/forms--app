import type { FieldTypes } from "@/shared/constants/field";
import { Modal, type ModalProps } from "@mantine/core";
import { AddBlockModalContent } from "./AddBlockModalContent/AddBlockModalContent";

export const AddBlockModal = (
	props: ModalProps & { onAddBlock: (type: FieldTypes) => void },
) => {
	const { opened, onClose, onAddBlock } = props;

	return (
		<Modal
			size="auto"
			padding="lg"
			title="Select block"
			opened={opened}
			onClose={onClose}
		>
			<AddBlockModalContent onAddBlock={onAddBlock} />
		</Modal>
	);
};
