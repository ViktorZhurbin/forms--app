import { Modal } from "@mantine/core";
import { SignInForm } from "~/components/SignInForm/SignInForm";
import type { ModalProps } from "../types";
import styles from "./SignInModal.module.css";

export const SignInModal = ({ isOpen, onClose }: ModalProps) => {
	return (
		<Modal opened={isOpen} onClose={onClose}>
			<SignInForm
				redirectTo={window.location.href}
				subtitle="to save your form."
				wrapperClass={styles.wrapper}
			/>
		</Modal>
	);
};
