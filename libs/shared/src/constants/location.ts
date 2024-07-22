const SearchParams = {
	BLOCK_ID: "blockId",
	PREVIEW: "preview",
	REDIRECT_TO: "redirectTo",
};

const Routes = {
	LOGIN: "/login",
	CREATE: "/create",

	ROOT: "/",
	ADMIN: "/ws/:wsNanoId",
	getAdminPath: ({ wsNanoId }: { wsNanoId?: string }) =>
		wsNanoId ? `/ws/${wsNanoId}` : "/",

	FORM: "/form/:formId",
	getFormPath: ({ formId }: { formId: string }) => `/form/${formId}`,
};

export { SearchParams, Routes };
