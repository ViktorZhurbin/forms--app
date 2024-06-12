import {
	type Question,
	QuestionGroup,
	QuestionType,
} from "../constants/questions";

export const formFields: Question[] = [
	{
		id: crypto.randomUUID(),
		type: QuestionType.YesNo,
		group: QuestionGroup.Choice,
		title: "Question 1",
		options: ["Yes", "No"],
	},
	{
		id: crypto.randomUUID(),
		type: QuestionType.MultipleChoice,
		group: QuestionGroup.Choice,
		title: "Question 2",
		options: ["Yes", "No", "Whatever"],
	},
	{
		id: crypto.randomUUID(),
		type: QuestionType.ShortText,
		group: QuestionGroup.Text,
		title: "Short text",
	},
	{
		id: crypto.randomUUID(),
		type: QuestionType.YesNo,
		group: QuestionGroup.Choice,
		title: "Question 4",
		options: ["Yes", "No"],
	},
];
