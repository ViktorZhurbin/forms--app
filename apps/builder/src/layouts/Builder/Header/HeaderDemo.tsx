import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { LoginModal } from "../modals/LoginModal/LoginModal";
import { EditableFormTitle } from "./EditableFormTitle/EditableFormTitle";
import styles from "./Header.module.css";
import { PreviewButton } from "./PreviewButton/PreviewButton";
import { PublishButton } from "./PublishButton/PublishButton";

export const HeaderDemo = () => {
	const [isModalOpen, modalActions] = useDisclosure(false);

	return (
		<>
			<div className={styles.root}>
				<EditableFormTitle />

				<div className={styles.wrapper}>
					<Button onClick={modalActions.open}>Sign up</Button>
					<PublishButton onClick={modalActions.open} />
					<PreviewButton />
					<DarkModeToggle />
				</div>
			</div>

			<LoginModal isOpen={isModalOpen} onClose={modalActions.close} />
		</>
	);
};
