import { Form } from "@/shared/layouts/Form/Form";
import { Button, Modal } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import type { ModalProps } from "../types";

export const PreviewModal = ({ isOpen, onClose }: ModalProps) => {
	return (
		<Modal
			fullScreen
			padding={0}
			opened={isOpen}
			withCloseButton={false}
			withOverlay={false}
			transitionProps={{ transition: "fade-down" }}
			onClose={onClose}
		>
			<Form
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
