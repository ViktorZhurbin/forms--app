type EditableButtonVariant = "outline" | "filled";

type EditableButtonProps = {
	readOnly?: boolean;
	buttonText: string;
	classNames?: Record<"textInput", string>;
	variant?: EditableButtonVariant;
	onClick?: () => void;
	onFocus?: () => void;
	onChange?: (value: string) => void;
};

export type { EditableButtonVariant, EditableButtonProps };
