import { useCurrentFormQuery } from "@/shared/models/form/read";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
import { NotFound } from "~/pages/NotFound/NotFound";
import { Main } from "../../Main/Main";
import { Navbar } from "../../Navbar/Navbar";
import { SmallScreen } from "../../SmallScreen/SmallScreen";
import styles from "./Editor.module.css";

export const EditorContent = () => {
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
				<Navbar />
			</nav>

			<main className={clsx("main", styles.main)}>
				<Main />
			</main>
		</div>
	);
};
