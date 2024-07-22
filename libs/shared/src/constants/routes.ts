const WEB_SITE_URL = "https://forms-website.pages.dev/";

const SearchParams = {
	BLOCK_ID: "blockId",
	PREVIEW: "preview",
	REDIRECT_TO: "redirectTo",
};

const Routes = {
	SIGN_IN: "/signin",
	CREATE: "/create",

	ROOT: "/",
	ADMIN: "/ws/:wsNanoId",
	getAdminPath: ({ wsNanoId }: { wsNanoId?: string }) =>
		wsNanoId ? `/ws/${wsNanoId}` : "/",

	FORM: "/form/:formId",
	getFormPath: ({ formId }: { formId: string }) => `/form/${formId}`,
};

export { SearchParams, Routes, WEB_SITE_URL };
