import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { isDev } from "~/utils/env";
import { CopyLinkButton } from "./CopyLinkButton/CopyLinkButton";
import { EditableFormTitle } from "./EditableFormTitle/EditableFormTitle";
import styles from "./Header.module.css";
import { HomeButton } from "./HomeButton/HomeButton";
import { OpenFormButton } from "./OpenFormButton/OpenFormButton";
import { PreviewButton } from "./PreviewButton/PreviewButton";
import { PublishButton } from "./PublishButton/PublishButton";

export const Header = () => {
	return (
		<div className={styles.root}>
			<div className={styles.innerWrapper}>
				<HomeButton />
				<EditableFormTitle />
			</div>
			<div className={styles.innerWrapper}>
				<PublishButton />
				<PreviewButton />
				<CopyLinkButton />
				{isDev && <OpenFormButton />}
				<DarkModeToggle />
			</div>
		</div>
	);
};
