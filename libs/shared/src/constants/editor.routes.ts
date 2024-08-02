const WEB_SITE_URL = "https://forms-website.pages.dev/";

const SearchParams = {
	BLOCK_ID: "blockId",
	PREVIEW: "preview",
	REDIRECT_TO: "redirectTo",
};

const Paths = {
	Root: "/",
	WS: "ws",
	Form: "form",
};

enum TabPaths {
	Create = "create",
	Results = "results",
}

const EditorRoutes = {
	ROOT: Paths.Root,
	SIGN_IN: "/signin",
	CREATE: "/create",

	WS: `/${Paths.WS}/:wsNanoId`,

	FORM: `/${Paths.Form}/:formNanoId/:tab?`,
	FORM_CREATE: `/${Paths.Form}/:formNanoId/${TabPaths.Create}`,
	FORM_RESULTS: `/${Paths.Form}/:formNanoId/${TabPaths.Results}`,
};

const EditorRouteUtils = {
	getWsPath(params: { wsNanoId?: string }) {
		const { wsNanoId } = params;

		return wsNanoId ? `/${Paths.WS}/${wsNanoId}` : Paths.Root;
	},

	getFormTabPath(params: { formNanoId: string; tab: TabPaths }) {
		const { formNanoId, tab } = params;

		return `/${Paths.Form}/${formNanoId}/${tab}`;
	},

	getFormCreatePath(params: { formNanoId: string }) {
		const { formNanoId } = params;

		return this.getFormTabPath({ formNanoId, tab: TabPaths.Create });
	},
};

export { SearchParams, EditorRoutes, EditorRouteUtils, TabPaths, WEB_SITE_URL };
