import { SidebarSection } from "../components/SidebarSection/SidebarSection";
import styles from "./SidebarSettings.module.css";
import { SettingsSwitch } from "./components/SettingsSwitch/SettingsSwitch";

export const SidebarSettings = () => {
	return (
		<SidebarSection title="Settings">
			<div className={styles.content}>
				<SettingsSwitch label="Required" />
			</div>
		</SidebarSection>
	);
};
