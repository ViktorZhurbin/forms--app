import { TextInput } from "@mantine/core";
import type { FocusEventHandler } from "react";
import type { TQuestion } from "~/models/forms/schema/questions";
import { useUpdateQuestion } from "~/models/forms/write/hooks/useUpdateQuestion";
import styles from "./ShortTextEdit.module.css";

type ShortTextEditProps = {
	placeholder?: string;
	questionId: TQuestion["id"];
};

export const ShortTextEdit = ({
	questionId,
	placeholder,
}: ShortTextEditProps) => {
	const { updateQuestion } = useUpdateQuestion();

	const handleEdit: FocusEventHandler<HTMLInputElement> = (event) => {
		updateQuestion({
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
