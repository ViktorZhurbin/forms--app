import { SortableDndList } from "@/shared/components/SortableDndList/SortableDndList";
import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { useSelectedBlockId } from "@/shared/hooks/useSelectedBlockId";
// import { SkeletonWrapper } from "~/components/SkeletonWrapper/SkeletonWrapper";
import type { TForm } from "@/shared/models/forms/schema/forms";
import { updateForm } from "@/shared/models/forms/write";
import { useDeleteQuestion } from "@/shared/models/forms/write/hooks/useDeleteQuestion";
import { ScrollArea } from "@mantine/core";
import { useCallback } from "react";
import { navigateToQuestion } from "../../utils/navigateToQuestion";
import { NavbarQuestion } from "../NavbarQuestions/NavbarQuestion/NavbarQuestion";
import styles from "./NavbarQuestionsList.module.css";

type NavbarQuestionsListProps = {
	questions: TForm["questions"];
};

type Question = NavbarQuestionsListProps["questions"][number];

export const NavbarQuestionsList = ({
	questions,
}: NavbarQuestionsListProps) => {
	const formNanoId = useFormNanoId();

	const firstQuestion = questions?.[0];
	const selectedBlockId = useSelectedBlockId(firstQuestion?.id);

	const { deleteQuestion } = useDeleteQuestion();

	const renderDragOverlay = useCallback(
		(activeItem: Question) => (
			<NavbarQuestion
				isDragged
				id={activeItem.id}
				type={activeItem.type}
				group={activeItem.group}
				title={activeItem.title}
				isSelected={
					Boolean(selectedBlockId) && activeItem.id === selectedBlockId
				}
			/>
		),
		[selectedBlockId],
	);

	const onDragEnd = useCallback(
		(newQuestions: Question[]): void => {
			updateForm({
				nanoid: formNanoId,
				draftQuestions: newQuestions,
			});
		},
		[formNanoId],
	);

	const renderChildren = useCallback(
		(activeItemId?: string) =>
			questions.map(({ id, type, group, title }, index, questions) => {
				const prevId = index === 0 ? null : questions[index - 1].id;

				const handleDelete = async () => {
					await deleteQuestion(id);

					if (prevId) {
						navigateToQuestion(prevId);
					}
				};

				return (
					<NavbarQuestion
						id={id}
						key={id}
						type={type}
						group={group}
						title={title}
						isGhost={activeItemId === id}
						order={index + 1}
						onDelete={handleDelete}
						isSelected={Boolean(selectedBlockId) && id === selectedBlockId}
					/>
					// </SkeletonWrapper>
				);
			}),
		[questions, deleteQuestion, selectedBlockId],
	);

	return (
		<ScrollArea scrollbars="y">
			<div className={styles.questionsList}>
				<SortableDndList
					list={questions}
					onDragEnd={onDragEnd}
					renderChildren={renderChildren}
					renderDragOverlay={renderDragOverlay}
				/>
			</div>
		</ScrollArea>
	);
};
