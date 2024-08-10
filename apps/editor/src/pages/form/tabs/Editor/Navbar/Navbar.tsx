import { FetchState } from "@/shared/components/FetchState/FetchState";
import { useCurrentFormWithFieldsQuery } from "@/shared/models/field/read";
import { NavLink } from "@mantine/core";
import { AddBlockButton } from "~/pages/form/components/AddBlockButton/AddBlockButton";
import styles from "./Navbar.module.css";
import { NavbarFieldsList } from "./components/NavbarFieldsList/NavbarFieldsList";
import { NavbarSection } from "./components/NavbarSection/NavbarSection";

export const Navbar = () => {
	const { isLoading, error } = useCurrentFormWithFieldsQuery();

	if (isLoading || error) {
		return <FetchState error={error} isLoading={isLoading} />;
	}

	return (
		<div className={styles.root}>
			<NavbarSection
				title="Questions"
				icon={<AddBlockButton tooltip="Add block" />}
			>
				<NavbarFieldsList />
			</NavbarSection>

			<NavbarSection title="Endings">
				<NavLink p="8px 12px" label="Page 1" />
			</NavbarSection>
		</div>
	);
};
