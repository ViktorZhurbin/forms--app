import { FieldTypes } from "~/constants/field";
import type { TField } from "~/models/field/schema";
import { updateField } from "~/models/field/write";
import { EditableButton } from "../EditableButton/EditableButton";
import { EditableTextarea } from "../EditableTextarea/EditableTextarea";
import { FieldBase } from "../FieldBase/FieldBase";
import { getFieldProps } from "../FieldBase/getFieldProps";
import { MultipleChoiceEdit } from "../fields/MultipleChoice/editable/MultipleChoiceEdit";
import { ShortTextEdit } from "../fields/ShortText/editable/ShortTextEdit";

interface FieldEditProps {
	order: number;
	isLast: boolean;
	field: TField;
}

export const FieldEdit = ({ order, field, isLast }: FieldEditProps) => {
	const onEditTitle = (title: string) => {
		updateField({
			id: field.id,
			payload: { title },
		});
	};

	const onEditButtonText = (buttonText: string) => {
		updateField({
			id: field.id,
			payload: { buttonText },
		});
	};

	const { button, title } = getFieldProps({ field, isLast });

	return (
		<FieldBase
			order={order}
			title={
				<EditableTextarea
					variant="h1"
					placeholder="Your question here..."
					initialValue={title}
					onEdit={onEditTitle}
				/>
			}
			field={getFieldComponent({ field })}
			buttonSubmit={
				<EditableButton
					isEditable
					onEdit={onEditButtonText}
					value={button.text}
					classNames={{
						button: button.className,
					}}
				/>
			}
		/>
	);
};

function getFieldComponent({ field }: Pick<FieldEditProps, "field">) {
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

		case FieldTypes.ShortText:
			return (
				<ShortTextEdit fieldId={field.id} placeholder={field.textPlaceholder} />
			);

		default:
			return false;
	}
}
