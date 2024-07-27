import { Textarea } from "@mantine/core";
import { useDragSortable } from "~/components/SortableDndList/hooks/useDragSortable";
import { clx } from "~/utils/classNames";
import styles from "./MultipleChoiceOption.module.css";
import type { MultipleChoiceOptionProps } from "./types";

export const MultipleChoiceOption = ({
	id,
	isDragged,
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
				classNames={{
					input: clx(styles.textInput, classNames?.textInput),
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
