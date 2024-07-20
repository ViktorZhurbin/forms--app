import styles from "./ContentEditable.module.css";

export type ContentEditableProps = {
	isEditable: boolean;
	value: string;
};

export const ContentEditable = ({
	value,
	isEditable,
}: ContentEditableProps) => {
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
