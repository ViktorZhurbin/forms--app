import {
	QuestionGroups,
	type QuestionType,
	QuestionTypes,
} from "~/constants/questions";

export const formFields: QuestionType[] = [
	{
		id: "1",
		type: QuestionTypes.MultipleChoice,
		group: QuestionGroups.Choice,
		title: "Multiple Choices adadadda",
		options: [
			"Yes",
			"No",
			"Whatever",
			"WhateverWhateverWhateverWhateverWhateverWhatever WhateverWhateverWhateverWhatever WhateverWhateverWhatever WhateverWhateverWhatever",
		],
	},
	{
		id: "2",
		type: QuestionTypes.YesNo,
		group: QuestionGroups.Choice,
		title: "Yes/No",
		options: ["Yes", "No"],
	},
	{
		id: "3",
		type: QuestionTypes.ShortText,
		group: QuestionGroups.Text,
		title: "Short text",
	},
	{
		id: "4",
		type: QuestionTypes.YesNo,
		group: QuestionGroups.Choice,
		title: "Question 4",
		options: ["Yes", "No"],
	},
];
