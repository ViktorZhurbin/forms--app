import clsx from "clsx";
import { FieldTypes } from "~/constants/field";
import type { TField } from "~/models/field/schema";
import { updateField } from "~/models/field/write";
import { isFieldRequired } from "~/utils/fieldPredicates";
import { EditableButton } from "../../EditableButton/EditableButton";
import { EditableTextarea } from "../../EditableTextarea/EditableTextarea";
import { FieldBase } from "../FieldBase/FieldBase";
import { getFieldProps } from "../FieldBase/getFieldProps";
import { MultipleChoiceEdit } from "../MultipleChoice/editable/MultipleChoiceEdit";
import { ShortTextEdit } from "../ShortText/editable/ShortTextEdit";
import styles from "./FieldEdit.module.css";

interface FieldEditProps {
	order: number | null;
	isLastQuestion: boolean;
	field: TField;
}

export const FieldEdit = ({ order, field, isLastQuestion }: FieldEditProps) => {
	const onEditTitle = (title: string) => {
		updateField({
			id: field.id,
			payload: { title },
		});
	};

	const onEditDescription = (description: string) => {
		updateField({
			id: field.id,
			payload: { description },
		});
	};

	const onEditButtonText = (buttonText: string) => {
		updateField({
			id: field.id,
			payload: { buttonText },
		});
	};

	const { button, title } = getFieldProps({ field, isLastQuestion });
	const isButtonEditable = field.type !== FieldTypes.Ending;
	const isRequired = isFieldRequired(field);

	return (
		<FieldBase
			order={order}
			field={field}
			classNames={{ order: styles.order }}
			title={
				<EditableTextarea
					variant="h1"
					placeholder={title.placeholder}
					initialValue={title.text}
					onEdit={onEditTitle}
					classNames={{
						root: clsx({
							[styles.isRequired]: isRequired,
						}),
					}}
				/>
			}
			description={
				<EditableTextarea
					dimmed
					classNames={{ root: styles.description }}
					initialValue={field.description}
					placeholder="Description (optional)"
					onEdit={onEditDescription}
				/>
			}
			fieldComponent={getFieldComponent({ field })}
			buttonSubmit={
				<EditableButton
					value={button.text}
					onEdit={onEditButtonText}
					isEditable={isButtonEditable}
					classNames={{
						button: clsx(
							button.className,
							!isButtonEditable && styles.nonEditableButton,
						),
					}}
				/>
			}
		/>
	);
};

function getFieldComponent({
	field,
}: Pick<FieldEditProps, "field">): JSX.Element | null {
	switch (field.type) {
		case FieldTypes.YesNo:
		case FieldTypes.Checkboxes:
		case FieldTypes.MultipleChoice:
			return (
				<MultipleChoiceEdit
					fieldId={field.id}
					fieldType={field.type}
					options={field.options}
				/>
			);

		case FieldTypes.Email:
		case FieldTypes.ShortText:
			return (
				<ShortTextEdit fieldId={field.id} placeholder={field.placeholder} />
			);

		case FieldTypes.Welcome:
		case FieldTypes.Statement:
		case FieldTypes.Ending:
			return null;
	}
}
