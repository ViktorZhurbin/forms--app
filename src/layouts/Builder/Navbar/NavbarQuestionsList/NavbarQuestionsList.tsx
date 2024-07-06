import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	restrictToFirstScrollableAncestor,
	restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ScrollArea } from "@mantine/core";
import { useState } from "react";
// import { SkeletonWrapper } from "~/components/SkeletonWrapper/SkeletonWrapper";
import type { TForm } from "~/models/forms/schema/forms";
import { updateForm } from "~/models/forms/write";
import { useDeleteQuestion } from "~/models/forms/write/hooks/useDeleteQuestion";
import { useFormId } from "../../hooks/useFormId";
import { useSelectedBlockId } from "../../hooks/useSelectedBlockId";
import { navigateToQuestion } from "../../utils/navigateToQuestion";
import { NavbarQuestion } from "../NavbarQuestions/NavbarQuestion/NavbarQuestion";
import styles from "./NavbarQuestionsList.module.css";

export const NavbarQuestionsList = ({
	questions,
}: { questions: TForm["questions"] }) => {
	const formId = useFormId();

	const firstQuestion = questions?.[0];
	const selectedBlockId = useSelectedBlockId(firstQuestion?.id);

	const { deleteQuestion } = useDeleteQuestion();

	const [items, setItems] = useState(questions.map((question) => question.id));

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over?.id && active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.indexOf(active.id as string);
				const newIndex = items.indexOf(over.id as string);

				const newQuestions = arrayMove(questions, oldIndex, newIndex);

				updateForm({ id: formId, questions: newQuestions });

				return newQuestions.map((question) => question.id);
			});
		}
	};

	return (
		<ScrollArea scrollbars="y">
			<div className={styles.questionsList}>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
					modifiers={[
						restrictToVerticalAxis,
						restrictToFirstScrollableAncestor,
					]}
				>
					<SortableContext items={items} strategy={verticalListSortingStrategy}>
						{questions.map(({ id, type, group, title }, index, questions) => {
							const prevId = index === 0 ? null : questions[index - 1].id;

							const handleDelete = async () => {
								await deleteQuestion(id);

								if (prevId) {
									navigateToQuestion(prevId);
								}
							};

							return (
								// <SkeletonWrapper key={id} visible={activeItem?.id === id}>
								<NavbarQuestion
									id={id}
									key={id}
									type={type}
									group={group}
									title={title}
									order={index + 1}
									onDelete={handleDelete}
									isSelected={
										Boolean(selectedBlockId) && id === selectedBlockId
									}
								/>
								// </SkeletonWrapper>
							);
						})}
					</SortableContext>
				</DndContext>
			</div>
		</ScrollArea>
	);
};
