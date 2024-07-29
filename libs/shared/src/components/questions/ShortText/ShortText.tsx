import { TextInput } from "@mantine/core";
import type { TField } from "~/models/field/schema";

type ShortTextProps = {
	placeholder: string;
	questionId: TField["id"];
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
