import { useDragSortable } from "~/components/SortableDndList/hooks/useDragSortable";
import type { MultipleChoiceProps } from "../MultipleChoice";
import styles from "./MultipleChoiceOption.module.css";
import { OptionButton } from "./OptionButton/OptionButton";

export type MultipleChoiceOptionProps = {
	id: string;
	text: string;
	readOnly?: boolean;
	isDragged?: boolean;
	isSelected: boolean;
	isTempNewOptionId?: boolean;
	placeholder?: string;
	onBlur?: (value: string) => void;
	onDelete?: (id: string) => void;
	onClick?: () => void;
	canChooseMany: MultipleChoiceProps["canChooseMany"];
};

export const MultipleChoiceOption = (props: MultipleChoiceOptionProps) => {
	const { DragHandle, wrapperProps } = useDragSortable(props.id);

	const option = <OptionButton {...props} />;

	return props.readOnly ? (
		option
	) : (
		<div {...wrapperProps} className={styles.wrapper} tabIndex={-1}>
			<DragHandle className={styles.dragHandle} />
			{option}
		</div>
	);
};
