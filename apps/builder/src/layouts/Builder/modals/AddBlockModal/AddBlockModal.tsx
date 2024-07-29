import type { FieldTypes } from "@/shared/constants/fields";
import { Modal } from "@mantine/core";
import type { ModalProps } from "../types";
import { AddBlockModalContent } from "./AddBlockModalContent/AddBlockModalContent";

export const AddBlockModal = ({
	isOpen,
	onClose,
	onAddBlock,
}: ModalProps & { onAddBlock: (type: FieldTypes) => void }) => {
	return (
		<Modal title="Select block" opened={isOpen} onClose={onClose}>
			<AddBlockModalContent onAddBlock={onAddBlock} />
		</Modal>
	);
};
