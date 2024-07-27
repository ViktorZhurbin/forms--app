import {
	type FocusEvent,
	type KeyboardEventHandler,
	useRef,
	useState,
} from "react";
import styles from "./ContentEditable.module.css";

export type ContentEditableProps = {
	value: string;
	onEdit?: (value: string) => void;
};

export const ContentEditable = ({ value, onEdit }: ContentEditableProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isEditing, setIsEditing] = useState(false);

	const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (["Enter", "Escape"].includes(event.key)) {
			ref.current?.blur();
		}
	};

	const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
		const value = event.currentTarget.innerText;

		if (value.length < 1) {
			return;
		}

		onEdit?.(value);
		setIsEditing(false);
	};

	const handleClick = () => {
		setIsEditing(true);
	};

	return (
		<div
			contentEditable
			suppressContentEditableWarning
			ref={ref}
			tabIndex={0}
			data-is-editing={isEditing}
			onBlur={handleBlur}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			role="textbox"
			className={styles.editable}
		>
			{value}
		</div>
	);
};
