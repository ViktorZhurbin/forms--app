import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
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
		<div className={clsx("root", styles.root)}>
			<header className={clsx("header", styles.header)}>{header}</header>

			<nav className={clsx("nav", styles.nav)}>
				<NavbarQuestions />
				<NavbarThankYou />
			</nav>

			<main className={clsx("main", styles.main)}>
				<Main />
			</main>
		</div>
	);
};
