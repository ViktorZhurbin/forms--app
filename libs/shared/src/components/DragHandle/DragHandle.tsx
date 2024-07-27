import type { useSortable } from "@dnd-kit/sortable";
import { CloseButton } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import clsx from "clsx";
import styles from "./DragHandle.module.css";

type DragHandleProps = {
	className: string;
	listeners: ReturnType<typeof useSortable>["listeners"];
};

export const DragHandle = ({ listeners, className }: DragHandleProps) => {
	return (
		<CloseButton
			{...listeners}
			size="sm"
			component="div"
			icon={<IconGripVertical />}
			className={clsx(styles.dragHandle, className)}
		/>
	);
};
