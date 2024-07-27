import { Textarea } from "@mantine/core";
import { useDragSortable } from "~/components/SortableDndList/hooks/useDragSortable";
import { clx } from "~/utils/classNames";
import styles from "./MultipleChoiceOption.module.css";
import { variantsMap } from "./constants";
import type { MultipleChoiceOptionProps } from "./types";

export const MultipleChoiceOption = ({
	id,
	isDragged,
	variant = "outline",
	readOnly,
	buttonText,
	classNames,
	onClick,
	onChange,
	onFocus,
}: MultipleChoiceOptionProps) => {
	const { DragHandle, wrapperProps } = useDragSortable(id);

	const handleClickButton = () => {
		if (readOnly) {
			onClick?.();
		}
	};

	const { inputVariant } = variantsMap[variant];

	return (
		<div
			{...wrapperProps}
			className={clx(styles.wrapper, isDragged && styles.isDragged)}
		>
			{!readOnly && <DragHandle className={styles.dragHandle} />}
			<Textarea
				autosize
				pointer={readOnly}
				readOnly={readOnly}
				value={buttonText}
				variant={inputVariant}
				classNames={{
					input: clx(styles.textInput, styles[variant], classNames?.textInput),
				}}
				onFocus={onFocus}
				onChange={(event) => {
					onChange?.(event.currentTarget.value);
				}}
				onClick={handleClickButton}
			/>
		</div>
	);
};
