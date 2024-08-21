import { DragHandle } from "@/shared/components/DragHandle/DragHandle";
import type { TField } from "@/shared/models/field/schema";
import { Button, CloseButton, Text } from "@mantine/core";
import clsx from "clsx";
import type { IItemProps } from "react-movable";
import { FieldTag } from "~/components/FieldTag/FieldTag";
import { navigateToFieldId } from "~/pages/form/utils/navigateToFieldId";
import styles from "./NavbarField.module.css";

interface NavbarFieldProps {
	order?: number;
	field: TField;
	withActions?: boolean;
	dragProps: IItemProps;
	isSelected?: boolean;
	isDragged?: boolean;
	onDelete?: () => void;
}

export const NavbarField = ({
	dragProps,
	field,
	order,
	withActions = true,
	isDragged,
	isSelected,
	onDelete,
}: NavbarFieldProps) => {
	const { nanoId, type, title } = field;

	return (
		<Button
			fullWidth
			{...dragProps}
			variant={isSelected ? "light" : "subtle"}
			justify="start"
			size="md"
			classNames={{
				root: clsx(styles.button, isDragged && styles.isDragged),
				inner: styles.buttonInner,
				label: styles.buttonLabel,
			}}
			data-active={isSelected}
			onClick={() => {
				navigateToFieldId({ nanoId });
			}}
		>
			<div className={styles.labelGroup}>
				<FieldTag type={type} text={order} />
				<Text size="sm" className={styles.labelTitle}>
					{title}
				</Text>
			</div>

			<div
				className={clsx(styles.actions, {
					[styles.actionsHidden]: !withActions,
				})}
			>
				<DragHandle isDragged={isDragged} />
				<CloseButton
					size="sm"
					component="div"
					onClick={async (event) => {
						event.preventDefault();
						event.stopPropagation();

						onDelete?.();
					}}
				/>
			</div>
		</Button>
	);
};
