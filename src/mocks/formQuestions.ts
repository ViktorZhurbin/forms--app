import {
	QuestionGroups,
	type QuestionType,
	QuestionTypes,
} from "../constants/questions";

export const formFields: QuestionType[] = [
	{
		id: crypto.randomUUID(),
		type: QuestionTypes.YesNo,
		group: QuestionGroups.Choice,
		title: "Question 1",
		options: ["Yes", "No"],
	},
	{
		id: crypto.randomUUID(),
		type: QuestionTypes.MultipleChoice,
		group: QuestionGroups.Choice,
		title: "Question 2",
		options: [
			"Yes",
			"No",
			"Whatever",
			"WhateverWhateverWhateverWhateverWhateverWhatever WhateverWhateverWhateverWhatever WhateverWhateverWhatever WhateverWhateverWhatever",
		],
	},
	{
		id: crypto.randomUUID(),
		type: QuestionTypes.ShortText,
		group: QuestionGroups.Text,
		title: "Short text",
	},
	{
		id: crypto.randomUUID(),
		type: QuestionTypes.YesNo,
		group: QuestionGroups.Choice,
		title: "Question 4",
		options: ["Yes", "No"],
	},
];
