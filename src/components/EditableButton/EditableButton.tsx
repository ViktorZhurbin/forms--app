import { Button } from "@mantine/core";
import { clx } from "~/utils/classNames";
import {
	EditableElement,
	type EditableElementProps,
} from "../EditableElement/EditableElement";
import styles from "./EditableButton.module.css";

interface EditableButtonProps extends EditableElementProps {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
	classNames?: {
		button?: string;
	};
}

export const EditableButton = ({
	value,
	onClick,
	onKeyDown,
	isEditable,
	classNames,
}: EditableButtonProps) => {
	return (
		<Button
			onClick={onClick}
			onKeyDown={onKeyDown}
			tabIndex={isEditable ? -1 : 0}
			className={clx(
				styles.button,
				isEditable ? styles.editable : null,
				classNames?.button,
			)}
		>
			<EditableElement value={value} isEditable={isEditable} />
		</Button>
	);
};
