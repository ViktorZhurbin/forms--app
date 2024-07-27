import { useDragSortable } from "~/components/SortableDndList/hooks/useDragSortable";
import type { MultipleChoiceProps } from "../MultipleChoice";
import styles from "./MultipleChoiceOption.module.css";
import { OptionButton } from "./OptionButton/OptionButton";

export type MultipleChoiceOptionProps = {
	id: string;
	type: MultipleChoiceProps["type"];
	readOnly?: boolean;
	isSelected: boolean;
	isDragged?: boolean;
	text: string;
	onClick?: () => void;
	onEdit?: (value: string) => void;
};

export const MultipleChoiceOption = ({
	id,
	type,
	isDragged,
	readOnly,
	isSelected,
	text,
	onClick,
	onEdit,
}: MultipleChoiceOptionProps) => {
	const { DragHandle, wrapperProps } = useDragSortable(id);

	const handleSelect = () => {
		if (readOnly) {
			onClick?.();
		}
	};

	const option = (
		<OptionButton
			type={type}
			isDragged={isDragged}
			isSelected={isSelected}
			text={text}
			readOnly={readOnly}
			onSelect={handleSelect}
			onEdit={onEdit}
		/>
	);

	return readOnly ? (
		option
	) : (
		<div {...wrapperProps} className={styles.wrapper} tabIndex={-1}>
			<DragHandle className={styles.dragHandle} />
			{option}
		</div>
	);
};
