import { Button, Group, Modal, type ModalProps } from "@mantine/core";

export const ConfirmationModal = (
	props: {
		children: React.ReactNode;
		confirmButtontext: string;
		isConfirmDisabled?: boolean;
		onConfirm: () => void;
	} & ModalProps,
) => {
	const {
		opened,
		onClose,
		onConfirm,
		title,
		children,
		confirmButtontext,
		isConfirmDisabled,
	} = props;

	return (
		<Modal opened={opened} onClose={onClose} title={title}>
			{children}
			<Group mt="xl" justify="end">
				<Button variant="default" onClick={onClose}>
					Close
				</Button>
				<Button disabled={isConfirmDisabled} color="red" onClick={onConfirm}>
					{confirmButtontext}
				</Button>
			</Group>
		</Modal>
	);
};
