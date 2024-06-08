import { FormField, QuestionType } from "../constants/form";

export const formFields: FormField[] = [
	{
		id: crypto.randomUUID(),
		type: QuestionType.YesNo,
		title: "Question 1",
		options: ["Yes", "No"],
	},
	{
		id: crypto.randomUUID(),
		type: QuestionType.MultipleChoice,
		title: "Question 2",
		options: ["Yes", "No", "Whatever"],
	},
	{
		id: crypto.randomUUID(),
		type: QuestionType.YesNo,
		title: "Question 3",
		options: ["Yes", "No"],
	},
	{
		id: crypto.randomUUID(),
		type: QuestionType.YesNo,
		title: "Question 4",
		options: ["Yes", "No"],
	},
];
