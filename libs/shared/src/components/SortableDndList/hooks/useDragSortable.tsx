import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { DragHandle } from "~/components/DragHandle/DragHandle";

export const useDragSortable = (id: string) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	return useMemo(
		() => ({
			DragHandle: ({ className }: { className: string }) => (
				<DragHandle listeners={listeners} className={className} />
			),
			wrapperProps: {
				...attributes,
				ref: setNodeRef,
				style: {
					transition,
					transform: CSS.Transform.toString(transform),
				},
			},
		}),
		[listeners, attributes, setNodeRef, transition, transform],
	);
};
