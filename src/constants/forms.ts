type FormType = {
	id: string;
	name: string;
	responseCount: number;
};

enum FormsLayout {
	Grid = "grid",
	List = "list",
}

export { FormsLayout };
export type { FormType };
