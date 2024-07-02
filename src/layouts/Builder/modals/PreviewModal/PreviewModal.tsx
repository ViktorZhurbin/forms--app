import { Modal } from "@mantine/core";
import { PreviewModalContent } from "./PreviewModalContent/PreviewModalContent";

type PreviewModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const PreviewModal = ({ isOpen, onClose }: PreviewModalProps) => {
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
