import { TextInput } from "@mantine/core";
import type { ChangeEventHandler } from "react";
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

	const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
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
			value={editMode ? placeholder : "TODO :)"}
			onFocus={onFocus}
			onChange={onChange}
			classNames={{ input: editMode ? styles.editModeInput : "" }}
		/>
	);
};
