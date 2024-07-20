import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { createPortal } from "react-dom";

export const SortableDndList = <T extends { id: string }>({
	list,
	onDragEnd,
	renderChildren,
	renderDragOverlay,
}: {
	list: T[];
	onDragEnd: (newList: T[]) => void;
	renderChildren: (activeId?: string) => React.ReactElement[];
	renderDragOverlay: (activeItem: T) => React.ReactElement;
}) => {
	const [activeItem, setActiveItem] = useState<T | null>(null);
	const [items, setItems] = useState(list.map((question) => question.id));

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragStart = (event: DragStartEvent) => {
		const activId = event.active.id as string;
		const activeItem = list.find((question) => question.id === activId);

		setActiveItem(activeItem ?? null);

		// setTimeout(() => {
		// 	debugger;
		// }, 1000);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over?.id && active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.indexOf(active.id as string);
				const newIndex = items.indexOf(over.id as string);

				const newList = arrayMove(list, oldIndex, newIndex);

				setActiveItem(null);
				onDragEnd(newList);

				return newList.map((question) => question.id);
			});
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart}
			modifiers={[
				restrictToVerticalAxis,
				// restrictToFirstScrollableAncestor,
			]}
		>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{renderChildren(activeItem?.id)}

				{createPortal(
					<DragOverlay>
						{activeItem ? renderDragOverlay(activeItem) : null}
					</DragOverlay>,
					document.body,
				)}
			</SortableContext>
		</DndContext>
	);
};
