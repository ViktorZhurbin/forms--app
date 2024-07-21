import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { EditableFormTitle } from "./EditableFormTitle/EditableFormTitle";
import styles from "./Header.module.css";
import { PreviewButton } from "./PreviewButton/PreviewButton";
import { PublishButton } from "./PublishButton/PublishButton";

export const HeaderDemo = () => {
	return (
		<div className={styles.root}>
			<EditableFormTitle />

			<div className={styles.wrapper}>
				<PublishButton />
				<PreviewButton />
				<DarkModeToggle />
			</div>
		</div>
	);
};
