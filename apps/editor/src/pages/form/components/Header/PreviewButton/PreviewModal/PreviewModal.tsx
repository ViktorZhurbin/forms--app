import { FormView } from "@/shared/layouts/Form/FormView";
import { Button, Modal, type ModalProps } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import styles from "./PreviewModal.module.css";
import { useFormPreviewFields } from "./hooks/useFormPreviewFields";

export const PreviewModal = ({ opened, onClose }: ModalProps) => {
	const { fields, endings } = useFormPreviewFields();

	const exitButton = (
		<Button color="dark.5" leftSection={<IconX />} onClick={onClose}>
			Exit preview
		</Button>
	);

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
			<FormView fields={fields} endings={endings} exitButton={exitButton} />
		</Modal>
	);
};
