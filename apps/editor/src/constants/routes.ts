const Paths = {
	Root: "/",
	WS: "ws",
	Form: "form",
};

enum TabPaths {
	Create = "/create",
	Results = "/results",
}

const EditorRoutes = {
	ROOT: Paths.Root,
	SIGN_IN: "/signin",
	CREATE: "/create",

	WS: `/${Paths.WS}/:wsNanoId`,
	FORM: `/${Paths.Form}/:formNanoId`,
} as const;

export { Paths, EditorRoutes, TabPaths };
