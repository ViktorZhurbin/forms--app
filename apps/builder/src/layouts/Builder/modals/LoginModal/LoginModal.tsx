import { Flex, Modal, Text, Title } from "@mantine/core";
import { LoginButtonGoogleCustom } from "~/components/LoginButtonGoogleCustom/LoginButtonGoogleCustom";
import type { ModalProps } from "../types";

export const LoginModal = ({ isOpen, onClose }: ModalProps) => {
	return (
		<Modal
			// title="Create your account"
			opened={isOpen}
			onClose={onClose}
		>
			<Flex
				direction="column"
				align="center"
				justify="center"
				ta="center"
				gap={24}
				// pt={16}
				pb={32}
			>
				<div>
					<Title>Create your account</Title>
					<Text c="dimmed">
						Don't loose access to your forms by creating an account.
					</Text>
				</div>
				<LoginButtonGoogleCustom redirectTo={window.location.href}>
					Sign up with Google
				</LoginButtonGoogleCustom>
			</Flex>
		</Modal>
	);
};
