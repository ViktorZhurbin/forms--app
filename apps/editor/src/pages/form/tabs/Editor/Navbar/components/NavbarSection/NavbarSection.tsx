import { ScrollArea } from "@mantine/core";
import { NavbarTitle } from "../NavbarTitle/NavbarTitle";
import styles from "./NavbarSection.module.css";

export const NavbarSection = (props: {
	title: string;
	icon?: React.ReactNode;
	children: React.ReactNode;
}) => {
	const { title, icon, children } = props;

	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<NavbarTitle>{title}</NavbarTitle>
				{icon}
			</div>

			<ScrollArea scrollbars="y">{children}</ScrollArea>
		</div>
	);
};
