import { Form } from "@/shared/layouts/Form/Form";
import { Button, Modal } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import type { ModalProps } from "../types";
import styles from "./PreviewModal.module.css";

export const PreviewModal = ({ isOpen, onClose }: ModalProps) => {
	return (
		<Modal
			fullScreen
			padding={0}
			withOverlay={false}
			withCloseButton={false}
			transitionProps={{ transition: "fade-down" }}
			opened={isOpen}
			onClose={onClose}
			classNames={{
				content: styles.modalContent,
			}}
		>
			<Form
				isPreview
				exitButton={
					<Button
						color="rgb(31, 41, 55)"
						leftSection={<IconX />}
						onClick={onClose}
					>
						Exit preview
					</Button>
				}
			/>
		</Modal>
	);
};
