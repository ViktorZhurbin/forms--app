import { FieldEdit } from "@/shared/components/FieldEdit/FieldEdit";
import { AddBlockButton } from "../../../components/AddBlockButton/AddBlockButton";
import { useCurrentField } from "../../../hooks/useCurrentField";
import styles from "./Main.module.css";

export const Main = () => {
	const { field, order, isLast } = useCurrentField();

	if (!field || order === null) return null;

	return (
		<div className={styles.root}>
			<AddBlockButton insertBefore tooltip="Add block above" />
			<div className={styles.fieldWrapper}>
				<FieldEdit field={field} order={order} isLast={isLast} />
			</div>
			<AddBlockButton tooltip="Add block below" />
		</div>
	);
};
