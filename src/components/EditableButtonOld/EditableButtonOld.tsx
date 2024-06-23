import { Textarea } from "@mantine/core";
import { useState } from "react";
import type { ChangeEventHandler } from "react";
import { clx } from "~/utils/classNames";
import styles from "./EditableButtonOld.module.css";
import { variantsMap } from "./constants";
import type { EditableButtonOldProps } from "./types";

export const EditableButtonOld = ({
	variant = "outline",
	readOnly,
	buttonText,
	classNames,
	onClick,
}: EditableButtonOldProps) => {
	const [value, setValue] = useState(buttonText);

	const handleClickButton = () => {
		if (readOnly) {
			onClick?.();
		}
	};

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
		setValue(event.currentTarget.value);
	};

	const { inputVariant } = variantsMap[variant];

	return (
		<Textarea
			autosize
			pointer={readOnly}
			readOnly={readOnly}
			value={value}
			variant={inputVariant}
			classNames={{
				input: clx(styles.textInput, styles[variant], classNames?.textInput),
			}}
			onChange={handleChange}
			onClick={handleClickButton}
		/>
	);
};
