import type { ButtonVariant, InputVariant } from "@mantine/core";
import type { EditableButtonVariant } from "./types";

const variantsMap: Record<
	EditableButtonVariant,
	{
		buttonVariant: ButtonVariant;
		inputVariant: InputVariant;
	}
> = {
	filled: {
		buttonVariant: "filled",
		inputVariant: "filled",
	},
	outline: {
		buttonVariant: "outline",
		inputVariant: "default",
	},
};

export { variantsMap };
