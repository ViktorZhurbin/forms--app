import { FetchState } from "@/shared/components/FetchState/FetchState";
import { FieldTypes } from "@/shared/constants/field";
import { useCurrentFormWithFieldsQuery } from "@/shared/models/field/read";
import type { TField } from "@/shared/models/field/schema";
import { getOrderedFields } from "@/shared/utils/field";
import { AddBlockButton } from "../../components/AddBlockButton/AddBlockButton";
import styles from "./Navbar.module.css";
import { NavbarSection } from "./components/NavbarSection/NavbarSection";

export const Navbar = () => {
	const { isLoading, error, data } = useCurrentFormWithFieldsQuery();

	if (isLoading || error) {
		return <FetchState error={error} isLoading={isLoading} />;
	}

	const orderedFields = getOrderedFields(data?.forms?.[0]?.fields);

	const { fields, endings } = orderedFields.reduce<{
		fields: TField[];
		endings: TField[];
	}>(
		(acc, field) => {
			if (field.type === FieldTypes.Ending) {
				acc.endings.push(field);
			} else {
				acc.fields.push(field);
			}

			return acc;
		},
		{ fields: [], endings: [] },
	);

	return (
		<div className={styles.root}>
			<NavbarSection
				title="Questions"
				fields={fields}
				icon={<AddBlockButton tooltip="Add block" />}
			/>

			<NavbarSection title="Endings" fields={endings} />
		</div>
	);
};
