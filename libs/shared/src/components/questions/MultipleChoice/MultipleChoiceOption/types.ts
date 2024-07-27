type MultipleChoiceOptionProps = {
	id: string;
	readOnly?: boolean;
	isDragged?: boolean;
	buttonText: string;
	classNames?: Record<"textInput", string>;
	onClick?: () => void;
	onFocus?: () => void;
	onChange?: (value: string) => void;
};

export type { MultipleChoiceOptionProps };
