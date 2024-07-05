import { Button, CloseButton, Text } from "@mantine/core";
import { QuestionTag } from "~/components/QuestionTag/QuestionTag";
import { navigateToQuestion } from "~/layouts/Builder/utils/navigateToQuestion";
import type { TQuestion } from "~/models/forms/schema/questions";
import { useDeleteQuestion } from "~/models/forms/write/hooks/useDeleteQuestion";
import styles from "./NavbarQuestion.module.css";

interface NavbarQuestionProps
	extends Pick<TQuestion, "id" | "type" | "group" | "title"> {
	order: number;
	isSelected: boolean;
	prevId: TQuestion["id"] | null;
}

export const NavbarQuestion = ({
	title,
	id,
	type,
	group,
	order,
	prevId,
	isSelected,
}: NavbarQuestionProps) => {
	const { deleteQuestion } = useDeleteQuestion();

	const handleDelete = async () => {
		await deleteQuestion(id);

		if (prevId) {
			navigateToQuestion(prevId);
		}
	};
	return (
		<Button
			variant={isSelected ? "light" : "subtle"}
			data-active={isSelected}
			justify="start"
			className={styles.button}
			onClick={() => {
				navigateToQuestion(id);
			}}
		>
			<div className={styles.labelGroup}>
				<QuestionTag type={type} group={group} text={order} />
				<Text size="sm" className={styles.labelTitle}>
					{title || "..."}
				</Text>
				<CloseButton
					component="div"
					className={styles.removeButton}
					onClick={async (event) => {
						event.preventDefault();

						handleDelete();
					}}
				/>
			</div>
		</Button>
	);
};
