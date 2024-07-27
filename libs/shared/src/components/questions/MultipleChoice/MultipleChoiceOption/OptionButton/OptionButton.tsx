import { Checkbox, Radio, Textarea } from "@mantine/core";
import clsx from "clsx";
import { useRef } from "react";
import type { MultipleChoiceOptionProps } from "../MultipleChoiceOption";
import styles from "./OptionButton.module.css";

interface OptionButtonProps
	extends Pick<
		MultipleChoiceOptionProps,
		"type" | "text" | "readOnly" | "isDragged" | "isSelected" | "onEdit"
	> {
	onSelect: () => void;
}

export const OptionButton = ({
	text,
	type,
	readOnly,
	isDragged,
	isSelected,
	onSelect,
	onEdit,
}: OptionButtonProps) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const Component = type === "radio" ? Radio : Checkbox;

	const handleClick = () => {
		if (readOnly) {
			onSelect();
		} else {
			inputRef.current?.focus();
		}
	};
	return (
		<Component.Card
			tabIndex={readOnly ? 0 : -1}
			checked={isSelected}
			onClick={handleClick}
			className={clsx(styles.root, {
				[styles.isEditable]: !readOnly,
				[styles.isDragged]: isDragged,
			})}
		>
			<Component.Indicator />
			<Textarea
				autosize
				ref={inputRef}
				tabIndex={readOnly ? -1 : 0}
				variant="unstyled"
				pointer={readOnly}
				readOnly={readOnly}
				value={text}
				onChange={(event) => {
					onEdit?.(event.currentTarget.value);
				}}
			/>
		</Component.Card>
	);
};
