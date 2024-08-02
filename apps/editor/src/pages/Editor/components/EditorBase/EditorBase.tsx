import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
import { FormLayout } from "../../FormLayout/FormLayout";
import { Main } from "../../Main/Main";
import { NavbarFields } from "../../Navbar/NavbarFields/NavbarFields";
import { NavbarThankYou } from "../../Navbar/NavbarThankYou/NavbarThankYou";
import { SmallScreen } from "../../SmallScreen/SmallScreen";
import styles from "./EditorBase.module.css";

export const EditorBase = ({ header }: { header: React.ReactElement }) => {
	const isTooSmall = useMediaQuery("(max-width: 668px)");

	if (isTooSmall) {
		return <SmallScreen />;
	}

	return (
		<FormLayout header={header}>
			<div className={styles.content}>
				<nav className={clsx("nav", styles.nav)}>
					<NavbarFields />
					<NavbarThankYou />
				</nav>

				<main className={clsx("main", styles.main)}>
					<Main />
				</main>
			</div>
		</FormLayout>
	);
};
