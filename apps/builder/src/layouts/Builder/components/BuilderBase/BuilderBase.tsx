import { useMediaQuery } from "@mantine/hooks";
import { Main } from "../../Main/Main";
import { NavbarQuestions } from "../../Navbar/NavbarQuestions/NavbarQuestions";
import { NavbarThankYou } from "../../Navbar/NavbarThankYou/NavbarThankYou";
import { SmallScreen } from "../../SmallScreen/SmallScreen";
import styles from "./BuilderBase.module.css";

export const BuilderBase = ({ header }: { header: React.ReactElement }) => {
	const isTooSmall = useMediaQuery("(max-width: 668px)");

	if (isTooSmall) {
		return <SmallScreen />;
	}

	return (
		<div className={styles.root}>
			<header className={styles.header}>{header}</header>

			<nav className={styles.nav}>
				<NavbarQuestions />
				<NavbarThankYou />
			</nav>

			<main className={styles.main}>
				<Main />
			</main>
		</div>
	);
};
