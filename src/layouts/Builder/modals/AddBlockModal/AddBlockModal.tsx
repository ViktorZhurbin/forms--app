import { Modal } from "@mantine/core";
import type { ModalProps } from "../types";
import { AddBlockModalContent } from "./AddBlockModalContent/AddBlockModalContent";

export const AddBlockModal = ({ isOpen, onClose }: ModalProps) => {
	return (
		<Modal title="Select block" opened={isOpen} onClose={onClose}>
			<AddBlockModalContent onClose={onClose} />
		</Modal>
	);
};
