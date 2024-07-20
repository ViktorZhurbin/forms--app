import { Textarea } from "@mantine/core";
import { clx } from "~/utils/classNames";
import styles from "./EditableButton.module.css";
import { variantsMap } from "./constants";
import type { EditableButtonProps } from "./types";

export const EditableButton = ({
	variant = "outline",
	readOnly,
	buttonText,
	classNames,
	onClick,
	onChange,
	onFocus,
}: EditableButtonProps) => {
	const handleClickButton = () => {
		if (readOnly) {
			onClick?.();
		}
	};

	const { inputVariant } = variantsMap[variant];

	return (
		<Textarea
			autosize
			pointer={readOnly}
			readOnly={readOnly}
			value={buttonText}
			variant={inputVariant}
			classNames={{
				input: clx(styles.textInput, styles[variant], classNames?.textInput),
			}}
			onFocus={onFocus}
			onChange={(event) => {
				onChange?.(event.currentTarget.value);
			}}
			onClick={handleClickButton}
		/>
	);
};
