import { EditorRouteUtils, TabPaths } from "@/shared/constants/editor.routes";
import { Tabs } from "@mantine/core";
import { useParams } from "wouter";
import { navigate } from "wouter/use-browser-location";
import styles from "./TabSections.module.css";

export const TabSections = () => {
	const { tab = "create", formNanoId } = useParams();

	const handleChange = (value: string | null): void => {
		if (!value || !formNanoId) return;

		const tabPath = EditorRouteUtils.getFormTabPath({
			formNanoId,
			tab: value as TabPaths,
		});

		navigate(tabPath);
	};

	return (
		<Tabs value={tab} onChange={handleChange}>
			<Tabs.List className={styles.tabsList}>
				<Tabs.Tab value={TabPaths.Create}>Create</Tabs.Tab>
				<Tabs.Tab value={TabPaths.Results}>Results</Tabs.Tab>
			</Tabs.List>
		</Tabs>
	);
};
