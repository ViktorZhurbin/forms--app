import { Modal } from "@mantine/core";
import type { ModalProps } from "../types";
import { AddBlockModalContent } from "./AddBlockModalContent/AddBlockModalContent";

export const AddBlockModal = ({
	isOpen,
	onClose,
	insertBefore,
}: ModalProps & { insertBefore?: boolean }) => {
	return (
		<Modal title="Select block" opened={isOpen} onClose={onClose}>
			<AddBlockModalContent insertBefore={insertBefore} onClose={onClose} />
		</Modal>
	);
};
