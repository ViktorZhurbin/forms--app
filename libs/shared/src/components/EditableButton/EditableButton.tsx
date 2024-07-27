import { Button } from "@mantine/core";
import clsx from "clsx";
import type { HTMLButtonProps } from "~/types/dom";
import {
	ContentEditable,
	type ContentEditableProps,
} from "../ContentEditable/ContentEditable";
import styles from "./EditableButton.module.css";

interface EditableButtonProps extends ContentEditableProps, HTMLButtonProps {
	classNames?: {
		button?: string;
	};
	onEdit: (value: string) => void;
}

export const EditableButton = ({
	value,
	onClick,
	onKeyDown,
	isEditable,
	classNames,
	onFocus,
	onEdit,
}: EditableButtonProps) => {
	return (
		<Button
			onFocus={onFocus}
			onClick={onClick}
			onKeyDown={onKeyDown}
			tabIndex={isEditable ? -1 : 0}
			className={clsx(
				styles.button,
				isEditable ? styles.editable : null,
				classNames?.button,
			)}
		>
			<ContentEditable value={value} isEditable={isEditable} onEdit={onEdit} />
		</Button>
	);
};
