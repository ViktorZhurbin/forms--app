import { SortableDndList } from "@/shared/components/SortableDndList/SortableDndList";
import { useSelectedBlockId } from "@/shared/hooks/useSelectedBlockId";
import { useOrderedFormFields } from "@/shared/models/field/read";
import type { TField } from "@/shared/models/field/schema";
import { deleteField, updateFieldsIndex } from "@/shared/models/field/write";
// import { SkeletonWrapper } from "~/components/SkeletonWrapper/SkeletonWrapper";
import { ScrollArea } from "@mantine/core";
import { useCallback } from "react";
import { navigateToField } from "../../../../utils/navigateToField";
import { removeSelectedBlockId } from "../../../../utils/removeSelectedBlockId";
import { NavbarField } from "../NavbarFields/NavbarField/NavbarField";
import styles from "./NavbarFieldsList.module.css";

export const NavbarFieldsList = () => {
	const fields = useOrderedFormFields();
	const firstField = fields[0];
	const selectedNanoId = useSelectedBlockId(firstField?.nanoId);

	const DragOverlayItem = ({ activeItem }: { activeItem: TField }) => (
		<NavbarField
			isDragged
			id={activeItem.id}
			type={activeItem.type}
			title={activeItem.title}
			nanoId={activeItem.nanoId}
			isSelected={
				Boolean(selectedNanoId) && activeItem.nanoId === selectedNanoId
			}
		/>
	);

	const onDragEnd = useCallback((newQuestions: TField[]): void => {
		const orderedFieldsIds = newQuestions.map(({ id }) => id);

		updateFieldsIndex(orderedFieldsIds);
	}, []);

	const Options = ({ activeItemId }: { activeItemId?: string }) =>
		fields.map(({ id, nanoId, type, title }, index, fields) => {
			const handleDelete = async () => {
				await deleteField({ id });

				if (nanoId !== selectedNanoId) return;

				// if the deleted field is the selected one, navigate to the next/prev one
				const isFirst = index === 0;
				const isLast = index === fields.length - 1;

				const prevField = isFirst ? null : fields[index - 1];
				const nextField = isLast ? null : fields[index + 1];

				const newSelectedBlockId = (prevField ?? nextField)?.nanoId;

				if (newSelectedBlockId) {
					navigateToField({ nanoId: newSelectedBlockId });
				} else {
					removeSelectedBlockId();
				}
			};

			return (
				<NavbarField
					id={id}
					key={id}
					type={type}
					title={title}
					nanoId={nanoId}
					isGhost={activeItemId === id}
					order={index + 1}
					onDelete={handleDelete}
					isSelected={Boolean(selectedNanoId) && nanoId === selectedNanoId}
				/>
				// </SkeletonWrapper>
			);
		});

	return (
		<ScrollArea scrollbars="y">
			<div className={styles.fieldsList}>
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