import { EditableTextarea } from "@/shared/components/EditableTextarea/EditableTextarea";
import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import styles from "./Header.module.css";
import { HomeButton } from "./HomeButton/HomeButton";
import { PreviewButton } from "./PreviewButton/PreviewButton";
import { PublishButton } from "./PublishButton/PublishButton";

export const HeaderDemo = () => {
	const onChangeTitle = () => {};

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<HomeButton />
				<EditableTextarea tooltip="Rename" onChange={onChangeTitle} />
			</div>
			<div className={styles.wrapper}>
				<PublishButton />
				<PreviewButton />
				<DarkModeToggle />
			</div>
		</div>
	);
};
