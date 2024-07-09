const SearchParams = {
	BLOCK_ID: "blockId",
	PREVIEW: "preview",
};

const Routes = {
	ROOT: "/",
	FORM: "form/:id",
	getFormPath: (formId: string) => `form/${formId}`,
};

export { SearchParams, Routes };
