import { TextInput } from "@mantine/core";
import type { FocusEventHandler } from "react";
import { useUpdateQuestion } from "~/models/form/write/hooks/useUpdateQuestion";
import type { TQuestion } from "~/models/question/schema/question";
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
