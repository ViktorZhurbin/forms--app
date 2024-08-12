import { SidebarSection } from "../components/SidebarSection/SidebarSection";
import { FieldSettings } from "./FieldSettings/FieldSettings";
import styles from "./SidebarSettings.module.css";

export const SidebarSettings = () => {
	return (
		<SidebarSection title="Settings">
			<div className={styles.content}>
				<FieldSettings />
			</div>
		</SidebarSection>
	);
};
