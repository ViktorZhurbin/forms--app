import { clx } from "@forms/shared/utils/classNames";
import { Button } from "@mantine/core";
import type { HTMLButtonProps } from "~/types/dom";
import {
	EditableElement,
	type EditableElementProps,
} from "../EditableElement/EditableElement";
import styles from "./EditableButton.module.css";

interface EditableButtonProps extends EditableElementProps, HTMLButtonProps {
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
			<EditableElement value={value} isEditable={isEditable} />
		</Button>
	);
};
