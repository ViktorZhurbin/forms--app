import { FetchState } from "@/shared/components/FetchState/FetchState";
import { useCurrentFormWithFieldsQuery } from "@/shared/models/field/read";
import { getFieldsAndEndings } from "@/shared/utils/field";
import { AddBlockButton } from "../../components/AddBlockButton/AddBlockButton";
import styles from "./Navbar.module.css";
import { NavbarSection } from "./components/NavbarSection/NavbarSection";

export const Navbar = () => {
	const { isLoading, error, data } = useCurrentFormWithFieldsQuery();

	if (isLoading || error) {
		return <FetchState error={error} isLoading={isLoading} />;
	}

	const { fields, endings } = getFieldsAndEndings(data?.forms?.[0]?.fields);

	return (
		<div className={styles.root}>
			<NavbarSection
				title="Questions"
				fields={fields}
				icon={<AddBlockButton tooltip="Add block" />}
			/>

			<div className={styles.spacer} />

			<NavbarSection title="Endings" fields={endings} />
		</div>
	);
};
