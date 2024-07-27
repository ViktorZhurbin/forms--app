import { CloseButton, Textarea, UnstyledButton } from "@mantine/core";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import styles from "./OptionButton.module.css";

export type OptionButtonProps = {
	id: string;
	text: string;
	isDragged?: boolean;
	isEditable?: boolean;
	isSelected?: boolean;
	isTempNewOptionId?: boolean;
	placeholder?: string;
	onBlur?: (value: string) => void;
	onDelete?: (id: string) => void;
	onClick?: () => void;
	Indicator: React.FC<{ checked?: boolean }>;
};

export const OptionButton = ({
	id,
	text,
	isEditable,
	placeholder,
	isTempNewOptionId,
	Indicator,
	isDragged,
	isSelected,
	onClick,
	onBlur,
	onDelete,
}: OptionButtonProps) => {
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const handleClick = () => {
		onClick?.();
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
			tabIndex={isEditable ? -1 : 0}
			onClick={handleClick}
			className={clsx(styles.root, {
				[styles.isEditable]: isEditable,
				[styles.isDragged]: isDragged,
			})}
		>
			<Indicator checked={isSelected} />
			<Textarea
				autosize
				defaultValue={text}
				ref={inputRef}
				tabIndex={isEditable ? 0 : -1}
				placeholder={placeholder}
				variant="unstyled"
				pointer={!isEditable}
				readOnly={!isEditable}
				onBlur={(event) => {
					onBlur?.(event.currentTarget.value);
				}}
			/>
			{isEditable && (
				<CloseButton
					size="sm"
					component="div"
					onClick={() => onDelete?.(id)}
					className={styles.deleteButton}
				/>
			)}
		</UnstyledButton>
	);
};
