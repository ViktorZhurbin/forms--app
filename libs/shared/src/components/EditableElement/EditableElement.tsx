import styles from "./EditableElement.module.css";

export type EditableElementProps = {
	isEditable: boolean;
	value: string;
};

export const EditableElement = ({
	value,
	isEditable,
}: EditableElementProps) => {
	return isEditable ? (
		<div
			contentEditable
			suppressContentEditableWarning
			tabIndex={0}
			role="textbox"
			className={styles.editable}
		>
			{value}
		</div>
	) : (
		<div>{value}</div>
	);
};
