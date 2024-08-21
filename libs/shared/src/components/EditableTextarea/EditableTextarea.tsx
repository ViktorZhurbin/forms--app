import { type MantineSize, Textarea, Tooltip } from "@mantine/core";
import clsx from "clsx";
import { type KeyboardEventHandler, useRef } from "react";
import styles from "./EditableTextarea.module.css";

type EditableTextareaProps = {
	initialValue?: string;
	tooltip?: string;
	placeholder?: string;
	variant?: "h1";
	classNames?: {
		root?: string;
		input?: string;
	};
	dimmed?: boolean;
	size?: MantineSize;
	readOnly?: boolean;
	onFocus?: () => void;
	onEdit?: (value: string) => void;
};

export const EditableTextarea = ({
	variant,
	readOnly = false,
	initialValue = "",
	size,
	dimmed,
	tooltip,
	onFocus,
	onEdit,
	classNames,
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
				size={size}
				ref={inputRef}
				readOnly={readOnly}
				tabIndex={readOnly ? -1 : 0}
				variant="unstyled"
				defaultValue={initialValue}
				placeholder={placeholder}
				classNames={{
					root: classNames?.root,
					input: clsx(styles.input, classNames?.input, {
						[styles.h1]: variant === "h1",
						[styles.dimmed]: dimmed,
						[styles.readOnly]: readOnly,
					}),
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
