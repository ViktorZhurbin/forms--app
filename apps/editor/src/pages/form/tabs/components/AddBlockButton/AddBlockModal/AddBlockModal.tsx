import type { FieldTypes } from "@/shared/constants/field";
import { Modal } from "@mantine/core";
import type { ModalProps } from "../../../../modals/types";
import { AddBlockModalContent } from "./AddBlockModalContent/AddBlockModalContent";

export const AddBlockModal = (
	props: ModalProps & { onAddBlock: (type: FieldTypes) => void },
) => {
	const { isOpen, onClose, onAddBlock } = props;

	return (
		<Modal title="Select block" opened={isOpen} onClose={onClose}>
			<AddBlockModalContent onAddBlock={onAddBlock} />
		</Modal>
	);
};
