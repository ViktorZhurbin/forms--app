import { Button, Group, Modal, type ModalProps, Text } from "@mantine/core";

export const ConfirmationModal = (
	props: {
		text: string;
		confirmButtontext: string;
		onConfirm: () => void;
	} & ModalProps,
) => {
	const { opened, onClose, onConfirm, title, text, confirmButtontext } = props;

	return (
		<Modal opened={opened} onClose={onClose} title={title}>
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
