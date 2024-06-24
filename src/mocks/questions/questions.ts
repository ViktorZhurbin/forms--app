import { QuestionGroups, QuestionTypes } from "~/constants/questions";

export const QUESTION_SCHEMA = {
	id: { type: "string" },
	formId: { type: "string" },
	title: { type: "string" },
	type: { type: "string", allow: Object.keys(QuestionTypes) },
	group: { type: "string", allow: Object.keys(QuestionGroups) },
} as const;

export const mockQuestions = {
	"1": {
		id: "1",
		formId: "1",
		type: QuestionTypes.MultipleChoice,
		group: QuestionGroups.Choice,
		title: "Multiple Choices adadadda",
	},
	"2": {
		id: "2",
		formId: "1",
		type: QuestionTypes.YesNo,
		group: QuestionGroups.Choice,
		title: "Yes/No",
	},
	"3": {
		id: "3",
		formId: "1",
		type: QuestionTypes.ShortText,
		group: QuestionGroups.Text,
		title: "Short text",
	},
	// "4": {
	// 	id: "4",
	// 	formId: "1",
	// 	type: QuestionTypes.YesNo,
	// 	group: QuestionGroups.Choice,
	// 	title: "Question 4",
	// },
};
