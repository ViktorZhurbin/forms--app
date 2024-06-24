import { Textarea } from "@mantine/core";
import { type KeyboardEventHandler, useRef } from "react";
import styles from "./EditableTitle.module.css";

type EditableTitleProps = {
	initialValue?: string;
	readOnly?: boolean;
	onChange?: (value: string) => void;
};

export const EditableTitle = ({
	readOnly,
	onChange,
	initialValue = "",
}: EditableTitleProps) => {
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
				input: styles.input,
			}}
			onKeyDown={handleKeyDown}
			onChange={(event) => {
				const newValue = event.currentTarget.value;

				onChange?.(newValue);
			}}
		/>
	);
};
