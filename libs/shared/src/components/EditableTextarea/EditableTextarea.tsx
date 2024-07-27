import { Textarea, Tooltip } from "@mantine/core";
import clsx from "clsx";
import { type KeyboardEventHandler, useRef } from "react";
import styles from "./EditableTextarea.module.css";

type EditableTextareaProps = {
	initialValue?: string;
	tooltip?: string;
	placeholder?: string;
	variant?: "h1" | "body";
	readOnly?: boolean;
	onFocus?: () => void;
	onEdit?: (value: string) => void;
};

export const EditableTextarea = ({
	variant = "body",
	readOnly = false,
	initialValue = "",
	tooltip,
	onFocus,
	onEdit,
	placeholder,
}: EditableTextareaProps) => {
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
				defaultValue={initialValue}
				placeholder={placeholder}
				classNames={{
					input: clsx(
						styles.input,
						styles[variant],
						readOnly && styles.readOnly,
					),
				}}
				onFocus={onFocus}
				onKeyDown={handleKeyDown}
				onBlur={(event) => {
					const newValue = event.currentTarget.value;

					onEdit?.(newValue);
				}}
			/>
		</Tooltip>
	);
};
