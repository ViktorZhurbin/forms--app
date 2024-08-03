import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { SignInModal } from "../../modals/SignInModal/SignInModal";
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

				<div className={styles.innerWrapper}>
					<Button onClick={modalActions.open}>Sign in</Button>
					<PublishButton onClick={modalActions.open} />
					<PreviewButton />
					<DarkModeToggle />
				</div>
			</div>

			<SignInModal isOpen={isModalOpen} onClose={modalActions.close} />
		</>
	);
};
