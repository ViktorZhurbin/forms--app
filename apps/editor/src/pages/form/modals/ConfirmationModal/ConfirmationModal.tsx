import { Button, Group, Modal, Text } from "@mantine/core";
import type { ModalProps } from "../types";

export const ConfirmationModal = (
	props: {
		title: string;
		text: string;
		confirmButtontext: string;
		onConfirm: () => void;
	} & ModalProps,
) => {
	const { isOpen, onClose, onConfirm, title, text, confirmButtontext } = props;

	return (
		<Modal opened={isOpen} onClose={onClose} title={title}>
			<Text size="sm">{text}</Text>
			<Group mt="xl" justify="end">
				<Button variant="default" onClick={onClose}>
					Close
				</Button>
				<Button color="red" onClick={onConfirm}>
					{confirmButtontext}
				</Button>
			</Group>
		</Modal>
	);
};
