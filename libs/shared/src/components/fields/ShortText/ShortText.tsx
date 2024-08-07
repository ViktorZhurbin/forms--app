import { TextInput } from "@mantine/core";
import { debounce } from "es-toolkit";
import type { TAnswerText } from "~/models/response/schema";
import type { HandleFieldAnswer } from "../FieldView/FieldView";

type ShortTextProps = {
	placeholder: string;
	initialValue: TAnswerText["value"];
	onAnswer: HandleFieldAnswer<TAnswerText>;
};

export const ShortText = ({
	initialValue,
	onAnswer,
	placeholder,
}: ShortTextProps) => {
	const debouncedOnAnswer = debounce((value: TAnswerText["value"]) => {
		onAnswer({ value });
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
