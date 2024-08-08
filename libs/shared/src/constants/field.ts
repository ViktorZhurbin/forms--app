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

const isWelcomeOrEndingField = (type: FieldTypes) => {
	return type === FieldTypes.Welcome || type === FieldTypes.Ending;
};

export { FieldTypes, isChoiceField, isWelcomeOrEndingField };
