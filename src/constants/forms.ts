type FormType = {
	id: string;
	name: string;
	responseCount: number;
};

enum FormsLayoutType {
	Grid = "grid",
	List = "list",
}

export { FormsLayoutType };
export type { FormType };
