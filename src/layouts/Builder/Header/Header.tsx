import { TextInput } from "@mantine/core";
import { ColorSchemeToggle } from "~/components/ColorSchemeToggle/ColorSchemeToggle";
import styles from "./Header.module.css";
import { HomeButton } from "./HomeButton/HomeButton";
import { PreviewButton } from "./PreviewButton/PreviewButton";
import { PublishButton } from "./PublishButton/PublishButton";

export const Header = () => {
	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<HomeButton />
				<TextInput pointer defaultValue="My form" size="sm" />
			</div>
			<div className={styles.wrapper}>
				<ColorSchemeToggle />
				<PreviewButton />
				<PublishButton />
			</div>
		</div>
	);
};
