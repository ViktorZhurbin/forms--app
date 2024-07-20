import { Button } from "@mantine/core";
import type { HTMLButtonProps } from "~/types/dom";
import { clx } from "~/utils/classNames";
import {
	ContentEditable,
	type ContentEditableProps,
} from "../ContentEditable/ContentEditable";
import styles from "./EditableButton.module.css";

interface EditableButtonProps extends ContentEditableProps, HTMLButtonProps {
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
}: EditableButtonProps) => {
	return (
		<Button
			onFocus={onFocus}
			onClick={onClick}
			onKeyDown={onKeyDown}
			tabIndex={isEditable ? -1 : 0}
			className={clx(
				styles.button,
				isEditable ? styles.editable : null,
				classNames?.button,
			)}
		>
			<ContentEditable value={value} isEditable={isEditable} />
		</Button>
	);
};
