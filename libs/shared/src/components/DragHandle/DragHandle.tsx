import { CloseButton } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import clsx from "clsx";
import styles from "./DragHandle.module.css";

type DragHandleProps = {
	isDragged?: boolean;
	className?: string;
};

export const DragHandle = ({ isDragged, className }: DragHandleProps) => {
	return (
		<CloseButton
			data-movable-handle
			size="sm"
			component="div"
			icon={<IconGripVertical />}
			className={clsx(
				styles.dragHandle,
				isDragged && styles.isDragged,
				className,
			)}
		/>
	);
};
