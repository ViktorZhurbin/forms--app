type EditableButtonVariant = "outline" | "filled";

type MultipleChoiceOptionProps = {
	readOnly?: boolean;
	isDragged?: boolean;
	buttonText: string;
	id: string;
	classNames?: Record<"textInput", string>;
	variant?: EditableButtonVariant;
	onClick?: () => void;
	onFocus?: () => void;
	onChange?: (value: string) => void;
};

export type { EditableButtonVariant, MultipleChoiceOptionProps };
