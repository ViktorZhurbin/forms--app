enum FieldTypes {
	YesNo = "YesNo",
	Checkboxes = "Checkboxes",
	MultipleChoice = "MultipleChoice",
	ShortText = "ShortText",
	Welcome = "Welcome",
	Ending = "Ending",
}

const isChoiceField = (type: FieldTypes) => {
	return (
		type === FieldTypes.Checkboxes ||
		type === FieldTypes.MultipleChoice ||
		type === FieldTypes.YesNo
	);
};

export { FieldTypes, isChoiceField };
