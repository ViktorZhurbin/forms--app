import { FetchState } from "@/shared/components/FetchState/FetchState";
import { useCurrentFormWithFieldsQuery } from "@/shared/models/field/read";
import { getFieldsAndEndings } from "@/shared/utils/field";
import { AddBlockButton } from "../../components/AddBlockButton/AddBlockButton";
import { AddEndingButton } from "../../components/AddEndingButton/AddEndingButton";
import { SidebarSection } from "../components/SidebarSection/SidebarSection";
import styles from "./Navbar.module.css";
import { NavbarFieldsList } from "./components/NavbarFieldsList/NavbarFieldsList";

export const Navbar = () => {
	const { isLoading, error, data } = useCurrentFormWithFieldsQuery();

	if (isLoading || error) {
		return <FetchState error={error} isLoading={isLoading} />;
	}

	const form = data?.forms?.[0];
	const { fields, endings } = getFieldsAndEndings(form?.draftFields);

	return (
		<div className={styles.root}>
			<SidebarSection
				title="Questions"
				button={<AddBlockButton tooltip="Add block" />}
			>
				<NavbarFieldsList fields={fields} />
			</SidebarSection>

			<div className={styles.spacer} />

			<SidebarSection title="Endings" button={<AddEndingButton />}>
				<NavbarFieldsList fields={endings} />
			</SidebarSection>
		</div>
	);
};
