const SearchParams = {
	BLOCK_ID: "blockId",
	PREVIEW: "preview",
	REDIRECT_TO: "redirectTo",
};

const Routes = {
	ROOT: "/",
	LOGIN: "/login",
	FORM: "/form/:nanoid",
	getFormPath: ({ nanoid }: { nanoid: string }) => `form/${nanoid}`,
};

export { SearchParams, Routes };
