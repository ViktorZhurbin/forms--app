import { useSelectedBlockId } from "@/shared/hooks/useSelectedBlockId";
import type { TField } from "@/shared/models/field/schema";
import { deleteField, updateFieldsIndex } from "@/shared/models/field/write";
import { List, arrayMove } from "react-movable";
import { navigateToFieldId } from "~/pages/form/utils/navigateToFieldId";
import { NavbarField } from "../NavbarField/NavbarField";
import styles from "./NavbarFieldsList.module.css";

export const NavbarFieldsList = (props: {
	fields: TField[];
	withActions?: boolean;
}) => {
	const { fields, withActions } = props;

	const firstField = fields[0];
	const selectedNanoId = useSelectedBlockId(firstField?.nanoId);

	return (
		<List
			values={fields}
			onChange={({ oldIndex, newIndex }) => {
				const newItems = arrayMove(fields, oldIndex, newIndex);

				updateFieldsIndex(newItems.map(({ id }) => id));
			}}
			renderList={({ children, props }) => (
				<div {...props} className={styles.fieldsList}>
					{children}
				</div>
			)}
			renderItem={({
				value: field,
				index = 0,
				isDragged,
				isSelected,
				props: { key, ...props },
			}) => {
				const handleDelete = async () => {
					await deleteField({ id: field.id });

					if (field.nanoId !== selectedNanoId) return;

					// if the deleted field is the selected one, navigate to the next/prev one
					const isFirst = index === 0;
					const isLast = index === fields.length - 1;

					const prevField = isFirst ? null : fields[index - 1];
					const nextField = isLast ? null : fields[index + 1];

					const newSelectedBlockId = (prevField ?? nextField)?.nanoId;

					if (newSelectedBlockId) {
						navigateToFieldId({ nanoId: newSelectedBlockId });
					} else {
						navigateToFieldId({ nanoId: null });
					}
				};

				const isSelectedField =
					Boolean(selectedNanoId) && field.nanoId === selectedNanoId;

				return (
					<NavbarField
						key={field.nanoId}
						dragProps={props}
						field={field}
						isDragged={isDragged || isSelected}
						order={index + 1}
						withActions={withActions}
						onDelete={handleDelete}
						isSelected={isSelectedField}
					/>
				);
			}}
		/>
	);
};
