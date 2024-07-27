import {
	Checkbox,
	CloseButton,
	Radio,
	Textarea,
	UnstyledButton,
} from "@mantine/core";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import type { MultipleChoiceOptionProps } from "../MultipleChoiceOption";
import styles from "./OptionButton.module.css";

type OptionButtonProps = MultipleChoiceOptionProps;

export const OptionButton = ({
	id,
	text,
	readOnly,
	placeholder,
	isTempNewOptionId,
	canChooseMany,
	isDragged,
	isSelected,
	onClick,
	onBlur,
	onDelete,
}: OptionButtonProps) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const Component = canChooseMany ? Checkbox : Radio;

	const handleClick = () => {
		onClick?.();

		if (readOnly) return;
	};

	useEffect(() => {
		if (isTempNewOptionId) {
			inputRef.current?.select();
		}
	}, [isTempNewOptionId]);

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
					onBlur?.(event.currentTarget.value);
				}}
			/>
			<CloseButton
				size="sm"
				component="div"
				onClick={() => onDelete?.(id)}
				className={styles.deleteButton}
			/>
		</UnstyledButton>
	);
};
