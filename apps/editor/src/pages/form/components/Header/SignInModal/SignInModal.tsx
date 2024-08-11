import { Modal, type ModalProps } from "@mantine/core";
import { SignInForm } from "~/components/SignInForm/SignInForm";
import styles from "./SignInModal.module.css";

export const SignInModal = ({ opened, onClose }: ModalProps) => {
	return (
		<Modal opened={opened} onClose={onClose}>
			<SignInForm
				redirectTo={window.location.href}
				subtitle="to save your form."
				wrapperClass={styles.wrapper}
			/>
		</Modal>
	);
};
