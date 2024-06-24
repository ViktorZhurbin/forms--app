export const FORMS_SCHEMA = {
	id: { type: "string" },
	name: { type: "string" },
	responseCount: { type: "number", default: 0 },
} as const;

export const mockForms = {
	1: { id: "1", name: "Form 1", responseCount: 10 },
	// 2: {
	// 	id: "2",
	// 	name: "My Other Form",
	// 	responseCount: 10000,
	// },
};
