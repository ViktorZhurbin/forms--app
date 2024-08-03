import { useCurrentFormQuery } from "@/shared/models/form/read";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
import { NotFound } from "~/pages/NotFound/NotFound";
import { SmallScreen } from "../../components/SmallScreen/SmallScreen";
import styles from "./Editor.module.css";
import { Main } from "./Main/Main";
import { NavbarFields } from "./Navbar/NavbarFields/NavbarFields";
import { NavbarThankYou } from "./Navbar/NavbarThankYou/NavbarThankYou";

export const Editor = () => {
	const { data } = useCurrentFormQuery();
	const isTooSmall = useMediaQuery("(max-width: 668px)");

	const formNotFound = data?.forms.length === 0;

	if (formNotFound) {
		return <NotFound title="We can't find this form" />;
	}

	if (isTooSmall) {
		return <SmallScreen />;
	}

	return (
		<div className={styles.content}>
			<nav className={clsx("nav", styles.nav)}>
				<NavbarFields />
				<NavbarThankYou />
			</nav>

			<main className={clsx("main", styles.main)}>
				<Main />
			</main>
		</div>
	);
};
