import { FetchState } from "@/shared/components/FetchState/FetchState";
import { useCurrentFormWithFieldsQuery } from "@/shared/models/field/read";
import { getFieldsAndEndings } from "@/shared/utils/field";
import { AddBlockButton } from "../../components/AddBlockButton/AddBlockButton";
import { SidebarSection } from "../components/SidebarSection/SidebarSection";
import styles from "./Navbar.module.css";
import { NavbarFieldsList } from "./components/NavbarFieldsList/NavbarFieldsList";

export const Navbar = () => {
	const { isLoading, error, data } = useCurrentFormWithFieldsQuery();

	if (isLoading || error) {
		return <FetchState error={error} isLoading={isLoading} />;
	}

	const { fields, endings } = getFieldsAndEndings(
		data?.forms?.[0]?.draftFields,
	);

	return (
		<div className={styles.root}>
			<SidebarSection
				title="Questions"
				icon={<AddBlockButton tooltip="Add block" />}
			>
				<NavbarFieldsList fields={fields} />
			</SidebarSection>

			<div className={styles.spacer} />

			<SidebarSection title="Endings">
				<NavbarFieldsList fields={endings} />
			</SidebarSection>
		</div>
	);
};
