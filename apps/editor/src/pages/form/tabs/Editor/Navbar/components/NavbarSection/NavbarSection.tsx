import type { TField } from "@/shared/models/field/schema";
import { ScrollArea } from "@mantine/core";
import { NavbarFieldsList } from "../NavbarFieldsList/NavbarFieldsList";
import { NavbarTitle } from "../NavbarTitle/NavbarTitle";
import styles from "./NavbarSection.module.css";

export const NavbarSection = (props: {
	title: string;
	fields: TField[];
	icon?: React.ReactNode;
}) => {
	const { title, icon, fields } = props;

	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<NavbarTitle>{title}</NavbarTitle>
				{icon}
			</div>

			<ScrollArea
				offsetScrollbars
				type="auto"
				scrollbars="y"
				className={styles.content}
			>
				<NavbarFieldsList fields={fields} />
			</ScrollArea>
		</div>
	);
};
