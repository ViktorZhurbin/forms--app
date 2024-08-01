import { TextInput } from "@mantine/core";
import { debounce } from "es-toolkit";
import type { TField } from "~/models/field/schema";
import type { TAnswerText } from "~/models/response/schema";

type ShortTextProps = {
	fieldId: TField["id"];
	fieldType: TField["type"];
	initialValue: TAnswerText["value"];
	onAnswer: (answer: TAnswerText) => void;
	placeholder: string;
};

export const ShortText = ({
	fieldId,
	fieldType,
	initialValue,
	onAnswer,
	placeholder,
}: ShortTextProps) => {
	const debouncedOnAnswer = debounce((value: TAnswerText["value"]) => {
		onAnswer({ value, fieldId, type: fieldType });
	}, 500);

	return (
		<TextInput
			w="100%"
			placeholder={placeholder}
			defaultValue={initialValue}
			onChange={(event) => {
				debouncedOnAnswer(event.target.value);
			}}
		/>
	);
};
