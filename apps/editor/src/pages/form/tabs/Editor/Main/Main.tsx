import { FieldEdit } from "@/shared/components/fields/FieldEdit/FieldEdit";
import { useSelectedOrderedField } from "~/pages/form/hooks/useSelectedOrderedField";
import { AddBlockButton } from "../../components/AddBlockButton/AddBlockButton";
import styles from "./Main.module.css";

export const Main = () => {
	const { field, order, isLast } = useSelectedOrderedField();

	if (!field || order === null) return null;

	return (
		<div className={styles.root}>
			<AddBlockButton insertBefore tooltip="Add block above" />
			<div className={styles.fieldWrapper}>
				<FieldEdit key={field.id} field={field} order={order} isLast={isLast} />
			</div>
			<AddBlockButton tooltip="Add block below" />
		</div>
	);
};
