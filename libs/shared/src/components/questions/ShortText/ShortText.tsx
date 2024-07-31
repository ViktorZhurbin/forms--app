import { TextInput } from "@mantine/core";
import type { TField } from "~/models/field/schema";

type ShortTextProps = {
	placeholder: string;
	setValue: (value: string) => void;
	questionId: TField["id"];
};

export const ShortText = ({
	// questionId,
	setValue,
	placeholder,
}: ShortTextProps) => {
	return (
		<TextInput
			w="100%"
			placeholder={placeholder}
			onBlur={(event) => {
				setValue(event.target.value);
			}}
		/>
	);
};
