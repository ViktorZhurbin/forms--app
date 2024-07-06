import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, CloseButton, Text } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { QuestionTag } from "~/components/QuestionTag/QuestionTag";
import { navigateToQuestion } from "~/layouts/Builder/utils/navigateToQuestion";
import type { TQuestion } from "~/models/forms/schema/questions";
import { clx } from "~/utils/classNames";
import styles from "./NavbarQuestion.module.css";

interface NavbarQuestionProps
	extends Pick<TQuestion, "id" | "type" | "group" | "title"> {
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
	isGhost,
	isDragged,
	isSelected,
	onDelete,
}: NavbarQuestionProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	return (
		<Button
			fullWidth
			ref={setNodeRef}
			style={style}
			{...attributes}
			variant={isSelected ? "light" : "subtle"}
			justify="start"
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
				navigateToQuestion(id);
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
						<CloseButton
							{...listeners}
							size="sm"
							component="div"
							className={styles.dragHandle}
							icon={<IconGripVertical />}
						/>
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
