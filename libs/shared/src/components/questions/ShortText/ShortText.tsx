import { TextInput } from "@mantine/core";
import type { TQuestion } from "~/models/field/schema";

type ShortTextProps = {
	placeholder: string;
	questionId: TQuestion["id"];
};

export const ShortText = ({
	// questionId,
	placeholder,
}: ShortTextProps) => {
	return (
		<TextInput
			w="100%"
			placeholder={placeholder}
			// onBlur={handleEdit}
		/>
	);
};
