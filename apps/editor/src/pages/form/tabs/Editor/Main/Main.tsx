import { FieldEdit } from "@/shared/components/fields/FieldEdit/FieldEdit";
import { useSelectedOrderedField } from "~/pages/form/hooks/useSelectedOrderedField";
import { AddBlockButton } from "../../components/AddBlockButton/AddBlockButton";
import styles from "./Main.module.css";

export const Main = () => {
	const { field, order, isLastQuestion } = useSelectedOrderedField();

	if (!field) return null;

	return (
		<div className={styles.root}>
			<AddBlockButton insertBefore tooltip="Add content before" />
			<div className={styles.fieldWrapper}>
				<FieldEdit
					key={field.id}
					field={field}
					order={order}
					isLastQuestion={isLastQuestion}
				/>
			</div>
			<AddBlockButton tooltip="Add content after" />
		</div>
	);
};
