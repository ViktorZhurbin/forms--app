import { Text } from "@mantine/core";
import styles from "./SidebarTitle.module.css";

export const SidebarTitle = (props: { children: string }) => {
	const { children } = props;

	return (
		<Text c="dimmed" size="sm" className={styles.title}>
			{children}
		</Text>
	);
};
