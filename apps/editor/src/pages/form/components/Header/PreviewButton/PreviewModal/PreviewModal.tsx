import { Form } from "@/shared/layouts/Form/Form";
import { Button, Modal, type ModalProps } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import styles from "./PreviewModal.module.css";

export const PreviewModal = ({ opened, onClose }: ModalProps) => {
	return (
		<Modal
			fullScreen
			padding={0}
			withOverlay={false}
			withCloseButton={false}
			transitionProps={{ transition: "fade-down" }}
			opened={opened}
			onClose={onClose}
			classNames={{
				content: styles.modalContent,
			}}
		>
			<Form
				isPreview
				exitButton={
					<Button color="dark.5" leftSection={<IconX />} onClick={onClose}>
						Exit preview
					</Button>
				}
			/>
		</Modal>
	);
};
