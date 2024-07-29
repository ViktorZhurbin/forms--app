import { useDragSortable } from "@/shared/components/SortableDndList/hooks/useDragSortable";
import type { TField } from "@/shared/models/field/schema";
import { Button, CloseButton, Text } from "@mantine/core";
import clsx from "clsx";
import { QuestionTag } from "~/components/QuestionTag/QuestionTag";
import { navigateToQuestion } from "~/layouts/Builder/utils/navigateToQuestion";
import styles from "./NavbarQuestion.module.css";

interface NavbarQuestionProps
	extends Pick<TField, "id" | "nanoId" | "type" | "title"> {
	order?: number;
	isSelected?: boolean;
	isDragged?: boolean;
	isGhost?: boolean;
	onDelete?: () => void;
}

export const NavbarQuestion = ({
	id,
	type,
	title,
	order,
	nanoId,
	isGhost,
	isDragged,
	isSelected,
	onDelete,
}: NavbarQuestionProps) => {
	const { DragHandle, wrapperProps } = useDragSortable(id);

	return (
		<Button
			fullWidth
			{...wrapperProps}
			variant={isSelected ? "light" : "subtle"}
			justify="start"
			size="md"
			classNames={{
				root: clsx(
					styles.button,
					isGhost && styles.isGhost,
					isDragged && styles.isDragged,
				),
				inner: styles.buttonInner,
				label: styles.buttonLabel,
			}}
			data-active={isSelected}
			onClick={() => {
				navigateToQuestion({ nanoId });
			}}
		>
			{isGhost ? null : (
				<>
					<div className={styles.labelGroup}>
						<QuestionTag type={type} text={order} />
						<Text size="sm" className={styles.labelTitle}>
							{title || "..."}
						</Text>
					</div>
					<div className={styles.actions}>
						<DragHandle className={styles.dragHandle} />

						<CloseButton
							size="sm"
							component="div"
							onClick={async (event) => {
								event.preventDefault();
								event.stopPropagation();

								onDelete?.();
							}}
						/>
					</div>
				</>
			)}
		</Button>
	);
};
