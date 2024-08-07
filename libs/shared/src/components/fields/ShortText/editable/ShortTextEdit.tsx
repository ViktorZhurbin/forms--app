import { TextInput } from "@mantine/core";
import type { FocusEventHandler } from "react";
import type { TField } from "~/models/field/schema";
import { updateField } from "~/models/field/write";
import styles from "./ShortTextEdit.module.css";

type ShortTextEditProps = {
	placeholder?: string;
	fieldId: TField["id"];
};

export const ShortTextEdit = ({ fieldId, placeholder }: ShortTextEditProps) => {
	const handleEdit: FocusEventHandler<HTMLInputElement> = (event) => {
		updateField({
			id: fieldId,
			payload: { placeholder: event.currentTarget.value },
		});
	};

	return (
		<TextInput
			w="100%"
			placeholder={placeholder}
			defaultValue={placeholder}
			onBlur={handleEdit}
			classNames={{ input: styles.input }}
		/>
	);
};
