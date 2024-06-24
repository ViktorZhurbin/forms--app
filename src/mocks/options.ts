export type OptionType = {
	id: string;
	text: string;
	order: number;
	questionId: string;
};

export const OPTION_SCHEMA = {
	id: { type: "string" },
	text: { type: "string" },
	order: { type: "number" },
	questionId: { type: "string" },
} as const;

export const mockOptions = {
	"1": {
		id: "1",
		order: 1,
		questionId: "2",
		text: "Yes",
	},
	"2": {
		id: "2",
		order: 2,
		questionId: "2",
		text: "No",
	},
	"3": {
		id: "3",
		order: 3,
		questionId: "1",
		text: "Whatever",
	},
	"4": {
		id: "4",
		order: 4,
		questionId: "1",
		text: "Whatever Whatever Whatever Whatever Whatever Whatever Whatever Whatever Whatever Whatever Whatever Whatever Whatever Whatever",
	},
};
