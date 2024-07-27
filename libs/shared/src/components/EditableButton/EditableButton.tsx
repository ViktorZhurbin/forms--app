import { Button } from "@mantine/core";
import clsx from "clsx";
import type { HTMLButtonProps } from "~/types/dom";
import {
	ContentEditable,
	type ContentEditableProps,
} from "../ContentEditable/ContentEditable";
import styles from "./EditableButton.module.css";

interface EditableButtonProps extends ContentEditableProps, HTMLButtonProps {
	isEditable?: boolean;
	onEdit: (value: string) => void;
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
	onFocus,
	onEdit,
}: EditableButtonProps) => {
	return (
		<Button
			onFocus={onFocus}
			onClick={onClick}
			onKeyDown={onKeyDown}
			tabIndex={isEditable ? -1 : 0}
			className={clsx(styles.button, classNames?.button, {
				[styles.isEditable]: isEditable,
			})}
		>
			{isEditable ? <ContentEditable value={value} onEdit={onEdit} /> : value}
		</Button>
	);
};
