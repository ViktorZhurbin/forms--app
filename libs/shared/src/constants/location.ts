const SearchParams = {
	BLOCK_ID: "blockId",
	PREVIEW: "preview",
	REDIRECT_TO: "redirectTo",
};

const Routes = {
	ROOT: "/",
	LOGIN: "/login",
	FORM: "/form/:id",
	getFormPath: (formId: string) => `form/${formId}`,
};

export { SearchParams, Routes };
