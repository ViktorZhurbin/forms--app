import { Modal } from "@mantine/core";
import type { ModalProps } from "../types";
import { PreviewModalContent } from "./PreviewModalContent/PreviewModalContent";

export const PreviewModal = ({ isOpen, onClose }: ModalProps) => {
	return (
		<Modal
			fullScreen
			padding={0}
			opened={isOpen}
			withCloseButton={false}
			transitionProps={{ transition: "fade-down" }}
			onClose={onClose}
		>
			<PreviewModalContent onClose={onClose} />
		</Modal>
	);
};
