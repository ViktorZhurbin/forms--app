import { clx } from "@forms/shared/utils/classNames";
import { Textarea, Tooltip } from "@mantine/core";
import { type KeyboardEventHandler, useRef } from "react";
import styles from "./EditableText.module.css";

type EditableTextProps = {
	initialValue?: string;
	tooltip?: string;
	placeholder?: string;
	variant?: "h1" | "body";
	readOnly?: boolean;
	onFocus?: () => void;
	onChange?: (value: string) => void;
};

export const EditableText = ({
	variant = "body",
	tooltip,
	readOnly,
	onFocus,
	onChange,
	placeholder,
	initialValue = "",
}: EditableTextProps) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
		if (["Enter", "Escape"].includes(event.key)) {
			inputRef.current?.blur();
		}
	};

	return (
		<Tooltip withArrow label={tooltip} disabled={!tooltip}>
			<Textarea
				autosize
				ref={inputRef}
				readOnly={readOnly}
				tabIndex={readOnly ? -1 : 0}
				variant="unstyled"
				value={initialValue}
				placeholder={placeholder}
				classNames={{
					input: clx(
						styles.input,
						styles[variant],
						readOnly && styles.readOnly,
					),
				}}
				onFocus={onFocus}
				onKeyDown={handleKeyDown}
				onChange={(event) => {
					const newValue = event.currentTarget.value;

					onChange?.(newValue);
				}}
			/>
		</Tooltip>
	);
};
