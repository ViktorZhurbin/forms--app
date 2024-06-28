import { Textarea } from "@mantine/core";
import { type KeyboardEventHandler, useRef } from "react";
import { clx } from "~/utils/classNames";
import styles from "./EditableText.module.css";

type EditableTextProps = {
	initialValue?: string;
	variant?: "h1" | "body";
	readOnly?: boolean;
	onChange?: (value: string) => void;
};

export const EditableText = ({
	variant = "body",
	readOnly,
	onChange,
	initialValue = "",
}: EditableTextProps) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
		if (["Enter", "Escape"].includes(event.key)) {
			inputRef.current?.blur();
		}
	};

	return (
		<Textarea
			autosize
			ref={inputRef}
			readOnly={readOnly}
			tabIndex={readOnly ? -1 : 0}
			variant="unstyled"
			value={initialValue}
			classNames={{
				input: clx(styles.input, styles[variant]),
			}}
			onKeyDown={handleKeyDown}
			onChange={(event) => {
				const newValue = event.currentTarget.value;

				onChange?.(newValue);
			}}
		/>
	);
};
