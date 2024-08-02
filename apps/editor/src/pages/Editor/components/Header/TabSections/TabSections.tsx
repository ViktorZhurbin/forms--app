import { Tabs } from "@mantine/core";
import { useLocation } from "wouter";
import { TabPaths } from "~/constants/routes";
import styles from "./TabSections.module.css";

export const TabSections = () => {
	const [location, setLocation] = useLocation();

	const handleChange = (value: string | null): void => {
		if (!value) return;

		setLocation(value);
	};

	return (
		<Tabs value={location} onChange={handleChange}>
			<Tabs.List className={styles.tabsList}>
				<Tabs.Tab value={TabPaths.Create}>Create</Tabs.Tab>
				<Tabs.Tab value={TabPaths.Results}>Results</Tabs.Tab>
			</Tabs.List>
		</Tabs>
	);
};
