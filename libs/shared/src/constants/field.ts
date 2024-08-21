enum FieldTypes {
	YesNo = "YesNo",
	Checkboxes = "Checkboxes",
	MultipleChoice = "MultipleChoice",
	ShortText = "ShortText",
	/** @deprecated */
	Welcome = "Welcome",
	Statement = "Statement",
	Ending = "Ending",
}

const isChoiceField = (type: FieldTypes) => {
	return (
		type === FieldTypes.Checkboxes ||
		type === FieldTypes.MultipleChoice ||
		type === FieldTypes.YesNo
	);
};

const isSingleChoiceField = (type: FieldTypes) => {
	return type === FieldTypes.MultipleChoice || type === FieldTypes.YesNo;
};

const isNonQuestionField = (type: FieldTypes) => {
	return (
		type === FieldTypes.Welcome ||
		type === FieldTypes.Statement ||
		type === FieldTypes.Ending
	);
};

const isQuestionField = (type: FieldTypes) => {
	return type !== FieldTypes.Ending;
};

export {
	FieldTypes,
	isQuestionField,
	isChoiceField,
	isSingleChoiceField,
	isNonQuestionField,
};
