import { useDragSortable } from "~/components/SortableDndList/hooks/useDragSortable";
import {
	OptionButton,
	type OptionButtonProps,
} from "../../OptionButton/OptionButton";
import styles from "./OptionButtonSortable.module.css";

type OptionButtonSortableProps = Omit<OptionButtonProps, "isEditable">;

export const OptionButtonSortable = (props: OptionButtonSortableProps) => {
	const { DragHandle, wrapperProps } = useDragSortable(props.id);

	const option = <OptionButton isEditable {...props} />;

	return (
		<div {...wrapperProps} className={styles.wrapper} tabIndex={-1}>
			<DragHandle className={styles.dragHandle} />
			{option}
		</div>
	);
};
