import styles from "./ContentEditable.module.css";

export type ContentEditableProps = {
	isEditable: boolean;
	value: string;
	onEdit?: (value: string) => void;
};

export const ContentEditable = ({
	value,
	onEdit,
	isEditable,
}: ContentEditableProps) => {
	return isEditable ? (
		<div
			contentEditable
			suppressContentEditableWarning
			tabIndex={0}
			onBlur={(event) => {
				onEdit?.(event.currentTarget.innerText);
			}}
			role="textbox"
			className={styles.editable}
		>
			{value}
		</div>
	) : (
		<div>{value}</div>
	);
};
