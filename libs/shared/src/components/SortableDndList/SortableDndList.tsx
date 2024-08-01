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

type SortableDndListProps<T extends { id: string }> = {
	list: T[];
	onDragEnd: (newList: T[]) => void;
	Options: React.FC<{ activeItemId?: string }>;
	DragOverlayItem: React.FC<{ activeItem: T }>;
};

export const SortableDndList = <T extends { id: string }>({
	list,
	onDragEnd,
	Options,
	DragOverlayItem,
}: SortableDndListProps<T>) => {
	const [activeItem, setActiveItem] = useState<T | null>(null);
	const [items, setItems] = useState(list.map((field) => field.id));

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragStart = (event: DragStartEvent) => {
		const activId = event.active.id as string;
		const activeItem = list.find((field) => field.id === activId);

		setActiveItem(activeItem ?? null);
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

				return newList.map((field) => field.id);
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
				<Options activeItemId={activeItem?.id} />

				{createPortal(
					<DragOverlay>
						{activeItem ? <DragOverlayItem activeItem={activeItem} /> : null}
					</DragOverlay>,
					document.body,
				)}
			</SortableContext>
		</DndContext>
	);
};
