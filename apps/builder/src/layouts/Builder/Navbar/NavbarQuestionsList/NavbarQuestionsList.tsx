import { SortableDndList } from "@/shared/components/SortableDndList/SortableDndList";
import { useSelectedBlockId } from "@/shared/hooks/useSelectedBlockId";
import { useOrderedFormFields } from "@/shared/models/field/read";
import type { TQuestion } from "@/shared/models/field/schema";
import { deleteField, updateFieldsIndex } from "@/shared/models/field/write";
// import { SkeletonWrapper } from "~/components/SkeletonWrapper/SkeletonWrapper";
import { ScrollArea } from "@mantine/core";
import { useCallback } from "react";
import { navigateToQuestion } from "../../utils/navigateToQuestion";
import { removeSelectedBlockId } from "../../utils/removeSelectedBlockId";
import { NavbarQuestion } from "../NavbarQuestions/NavbarQuestion/NavbarQuestion";
import styles from "./NavbarQuestionsList.module.css";

type Question = TQuestion;

export const NavbarQuestionsList = () => {
	const fields = useOrderedFormFields();
	const firstQuestion = fields[0];
	const selectedBlockId = useSelectedBlockId(firstQuestion?.nanoId);

	const DragOverlayItem = ({ activeItem }: { activeItem: Question }) => (
		<NavbarQuestion
			isDragged
			id={activeItem.id}
			type={activeItem.type}
			group={activeItem.group}
			title={activeItem.title}
			nanoId={activeItem.nanoId}
			isSelected={
				Boolean(selectedBlockId) && activeItem.nanoId === selectedBlockId
			}
		/>
	);

	const onDragEnd = useCallback((newQuestions: Question[]): void => {
		const orderedFieldsIds = newQuestions.map(({ id }) => id);

		updateFieldsIndex(orderedFieldsIds);
	}, []);

	const Options = ({ activeItemId }: { activeItemId?: string }) =>
		fields.map(({ id, nanoId, type, group, title }, index, questions) => {
			const prevQuestion = index > 0 ? questions[index - 1] : null;
			const nextQuestion =
				index < questions.length - 1 ? questions[index + 1] : null;

			const newSelectedBlockId = (prevQuestion ?? nextQuestion)?.nanoId;

			const handleDelete = async () => {
				await deleteField({ id });

				if (newSelectedBlockId) {
					navigateToQuestion({ nanoId: newSelectedBlockId });
				} else {
					removeSelectedBlockId();
				}
			};

			return (
				<NavbarQuestion
					id={id}
					key={id}
					type={type}
					group={group}
					title={title}
					nanoId={nanoId}
					isGhost={activeItemId === id}
					order={index + 1}
					onDelete={handleDelete}
					isSelected={Boolean(selectedBlockId) && nanoId === selectedBlockId}
				/>
				// </SkeletonWrapper>
			);
		});

	return (
		<ScrollArea scrollbars="y">
			<div className={styles.questionsList}>
				<SortableDndList
					list={fields}
					onDragEnd={onDragEnd}
					Options={Options}
					DragOverlayItem={DragOverlayItem}
				/>
			</div>
		</ScrollArea>
	);
};
