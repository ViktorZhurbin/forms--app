import { ScrollArea } from "@mantine/core";
import { SidebarTitle } from "../SidebarTitle/SidebarTitle";
import styles from "./SidebarSection.module.css";

export const SidebarSection = (props: {
	title: string;
	children: React.ReactNode;
	button?: React.ReactNode;
}) => {
	const { title, button, children } = props;

	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<SidebarTitle>{title}</SidebarTitle>
				{button}
			</div>

			<ScrollArea
				offsetScrollbars
				type="auto"
				scrollbars="y"
				className={styles.content}
			>
				{children}
			</ScrollArea>
		</div>
	);
};
