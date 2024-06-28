import { QuestionGroups, QuestionTypes } from "~/constants/questions";

export const formFields = [
	{
		id: "1",
		formId: "1",
		type: QuestionTypes.MultipleChoice,
		group: QuestionGroups.Choice,
		title: "Multiple Choices adadadda",
	},
	{
		id: "2",
		type: QuestionTypes.YesNo,
		group: QuestionGroups.Choice,
		title: "Yes/No",
		formId: "1",
	},
	{
		id: "3",
		formId: "1",
		type: QuestionTypes.ShortText,
		group: QuestionGroups.Text,
		title: "Short text",
	},
	{
		id: "4",
		type: QuestionTypes.YesNo,
		group: QuestionGroups.Choice,
		title: "Question 4",
		formId: "1",
	},
];
