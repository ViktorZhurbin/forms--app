import { TextInput } from "@mantine/core";
import type { FocusEventHandler } from "react";
import type { TQuestion } from "~/models/forms/schema/questions";
import { useUpdateQuestion } from "~/models/forms/write/hooks/useUpdateQuestion";
import styles from "./ShortText.module.css";

type ShortTextProps = {
	placeholder?: string;
	editMode?: boolean;
	questionId: TQuestion["id"];
	onFocus?: () => void;
};

export const ShortText = ({
	editMode,
	questionId,
	placeholder,
	onFocus,
}: ShortTextProps) => {
	const { updateQuestion } = useUpdateQuestion();

	const handleEdit: FocusEventHandler<HTMLInputElement> = (event) => {
		if (editMode) {
			updateQuestion({
				id: questionId,
				payload: { textPlaceholder: event.currentTarget.value },
			});
		}
	};

	return (
		<TextInput
			w="100%"
			placeholder={placeholder}
			defaultValue={editMode ? placeholder : ""}
			onFocus={onFocus}
			onBlur={handleEdit}
			classNames={{ input: editMode ? styles.editModeInput : "" }}
		/>
	);
};
