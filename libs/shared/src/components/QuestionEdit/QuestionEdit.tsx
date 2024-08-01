import { FieldTypes } from "~/constants/field";
import type { TField } from "~/models/field/schema";
import { updateField } from "~/models/field/write";
import { EditableButton } from "../EditableButton/EditableButton";
import { EditableTextarea } from "../EditableTextarea/EditableTextarea";
import { QuestionBase } from "../QuestionBase/QuestionBase";
import { getFieldProps } from "../QuestionBase/getFieldProps";
import { MultipleChoiceEdit } from "../questions/MultipleChoice/editable/MultipleChoiceEdit";
import { ShortTextEdit } from "../questions/ShortText/editable/ShortTextEdit";

interface QuestionEditProps {
	order: number;
	isLast: boolean;
	field: TField;
}

export const QuestionEdit = ({ order, field, isLast }: QuestionEditProps) => {
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
		<QuestionBase
			order={order}
			title={
				<EditableTextarea
					variant="h1"
					placeholder="Your question here..."
					initialValue={title}
					onEdit={onEditTitle}
				/>
			}
			question={<FieldComponent field={field} />}
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

function FieldComponent({ field }: Pick<QuestionEditProps, "field">) {
	switch (field.type) {
		case FieldTypes.YesNo:
		case FieldTypes.Checkboxes:
		case FieldTypes.MultipleChoice:
			return (
				<MultipleChoiceEdit
					questionId={field.id}
					questionType={field.type}
					options={field.options}
				/>
			);

		case FieldTypes.ShortText:
			return (
				<ShortTextEdit
					questionId={field.id}
					placeholder={field.textPlaceholder}
				/>
			);

		default:
			return false;
	}
}
