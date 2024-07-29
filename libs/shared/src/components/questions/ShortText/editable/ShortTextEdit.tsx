import { TextInput } from "@mantine/core";
import type { FocusEventHandler } from "react";
import type { TQuestion } from "~/models/field/schema";
import { updateField } from "~/models/field/write";
import styles from "./ShortTextEdit.module.css";

type ShortTextEditProps = {
	placeholder?: string;
	questionId: TQuestion["id"];
};

export const ShortTextEdit = ({
	questionId,
	placeholder,
}: ShortTextEditProps) => {
	const handleEdit: FocusEventHandler<HTMLInputElement> = (event) => {
		updateField({
			id: questionId,
			payload: { textPlaceholder: event.currentTarget.value },
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
