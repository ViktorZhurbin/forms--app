type EditableButtonVariant = "outline" | "filled";

type EditableButtonOldProps = {
	readOnly?: boolean;
	buttonText: string;
	classNames?: Record<"textInput", string>;
	variant?: EditableButtonVariant;
	onClick?: () => void;
};

export type { EditableButtonVariant, EditableButtonOldProps };
