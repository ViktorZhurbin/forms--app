import { useDragSortable } from "@/shared/components/SortableDndList/hooks/useDragSortable";
import type { TQuestion } from "@/shared/models/forms/schema/questions";
import { clx } from "@/shared/utils/classNames";
import { Button, CloseButton, Text } from "@mantine/core";
import { QuestionTag } from "~/components/QuestionTag/QuestionTag";
import { navigateToQuestion } from "~/layouts/Builder/utils/navigateToQuestion";
import styles from "./NavbarQuestion.module.css";

interface NavbarQuestionProps
	extends Pick<TQuestion, "id" | "nanoid" | "type" | "group" | "title"> {
	order?: number;
	isSelected?: boolean;
	isDragged?: boolean;
	isGhost?: boolean;
	onDelete?: () => void;
}

export const NavbarQuestion = ({
	id,
	type,
	group,
	title,
	order,
	nanoid,
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
				root: clx(
					styles.button,
					isGhost && styles.isGhost,
					isDragged && styles.isDragged,
				),
				inner: styles.buttonInner,
				label: styles.buttonLabel,
			}}
			data-active={isSelected}
			onClick={() => {
				navigateToQuestion({ nanoid });
			}}
		>
			{isGhost ? null : (
				<>
					<div className={styles.labelGroup}>
						<QuestionTag type={type} group={group} text={order} />
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

								onDelete?.();
							}}
						/>
					</div>
				</>
			)}
		</Button>
	);
};
