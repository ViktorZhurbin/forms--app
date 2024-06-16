import { TextInput } from "@mantine/core";
import { type KeyboardEventHandler, useRef, useState } from "react";
import styles from "./EditableTitle.module.css";

type EditableTitleProps = {
	initialValue?: string;
};

export const EditableTitle = ({ initialValue = "" }: EditableTitleProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [inputValue, setInputValue] = useState(initialValue);

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (["Enter", "Escape"].includes(event.key)) {
			inputRef.current?.blur();
		}
	};

	return (
		<TextInput
			ref={inputRef}
			classNames={{
				input: styles.input,
			}}
			value={inputValue}
			onKeyDown={handleKeyDown}
			onChange={(event) => {
				setInputValue(event.currentTarget.value);
			}}
			variant="unstyled"
		/>
	);
};
