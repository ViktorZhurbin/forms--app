import { Textarea } from "@mantine/core";
import { type KeyboardEventHandler, useEffect, useRef, useState } from "react";
import styles from "./EditableTitle.module.css";

type EditableTitleProps = {
	initialValue?: string;
	readOnly?: boolean;
};

export const EditableTitle = ({
	readOnly,
	initialValue = "",
}: EditableTitleProps) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const [inputValue, setInputValue] = useState(initialValue);

	useEffect(() => {
		setInputValue(initialValue);
	}, [initialValue]);

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
			value={inputValue}
			classNames={{
				input: styles.input,
			}}
			onKeyDown={handleKeyDown}
			onChange={(event) => {
				setInputValue(event.currentTarget.value);
			}}
		/>
	);
};
