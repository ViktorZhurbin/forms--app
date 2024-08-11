import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { EditableFormTitle } from "./EditableFormTitle/EditableFormTitle";
import styles from "./Header.module.css";
import { PreviewButton } from "./PreviewButton/PreviewButton";
import { PublishButton } from "./PublishButton/PublishButton";
import { SignInModal } from "./SignInModal/SignInModal";

export const HeaderDemo = () => {
	const [isModalOpen, modalActions] = useDisclosure(false);

	return (
		<>
			<div className={styles.root}>
				<EditableFormTitle />

				<div className={styles.innerWrapper}>
					<Button onClick={modalActions.open}>Sign in</Button>
					<PublishButton onClick={modalActions.open} />
					<PreviewButton />
					<DarkModeToggle />
				</div>
			</div>

			<SignInModal opened={isModalOpen} onClose={modalActions.close} />
		</>
	);
};
