import { useCurrentFormQuery } from "@/shared/models/form/read";
import clsx from "clsx";
import { NotFound } from "~/pages/NotFound/NotFound";
import { AddBlockModal } from "../components/AddBlockModal/AddBlockModal";
import styles from "./Editor.module.css";
import { Main } from "./Main/Main";
import { Navbar } from "./Navbar/Navbar";
import { SidebarSettings } from "./SidebarSettings/SidebarSettings";

export const Editor = () => {
	const { data } = useCurrentFormQuery();

	const formNotFound = data?.forms.length === 0;

	if (formNotFound) {
		return <NotFound title="We can't find this form" />;
	}

	const sidebarClass = clsx("sidebar", styles.sidebar);

	return (
		<div className={styles.root}>
			<div className={clsx(sidebarClass, styles.left)}>
				<Navbar />
			</div>

			<main className={clsx("main", styles.main)}>
				<Main />
			</main>

			<div className={clsx(sidebarClass, styles.right)}>
				<SidebarSettings />
			</div>

			<AddBlockModal />
		</div>
	);
};
