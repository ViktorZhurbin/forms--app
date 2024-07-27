import { Checkbox, Radio, Textarea, UnstyledButton } from "@mantine/core";
import clsx from "clsx";
import { useRef } from "react";
import type { MultipleChoiceOptionProps } from "../MultipleChoiceOption";
import styles from "./OptionButton.module.css";

type OptionButtonProps = MultipleChoiceOptionProps;

export const OptionButton = ({
	text,
	type,
	readOnly,
	placeholder,
	// isLast,
	isDragged,
	isSelected,
	onClick,
	onEdit,
}: OptionButtonProps) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const Component = type === "radio" ? Radio : Checkbox;

	const handleClick = () => {
		onClick?.();

		if (readOnly) return;
	};

	return (
		<UnstyledButton
			variant="default"
			data-checked={isSelected}
			tabIndex={readOnly ? 0 : -1}
			onClick={handleClick}
			className={clsx(styles.root, {
				[styles.isEditable]: !readOnly,
				[styles.isDragged]: isDragged,
			})}
		>
			<Component.Indicator checked={isSelected} />
			<Textarea
				autosize
				defaultValue={text}
				ref={inputRef}
				tabIndex={readOnly ? -1 : 0}
				placeholder={placeholder}
				variant="unstyled"
				pointer={readOnly}
				readOnly={readOnly}
				onBlur={(event) => {
					if (text !== event.currentTarget.value) {
						onEdit?.(event.currentTarget.value);
					}
				}}
			/>
		</UnstyledButton>
	);
};
