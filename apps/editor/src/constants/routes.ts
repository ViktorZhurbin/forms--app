const Paths = {
	Root: "/",
	WS: "/ws",
	Form: "/form",
	Signin: "/signin",
	Create: "/create",
};

enum Tabs {
	Create = "create",
	Results = "results",
}

type FormPathParams = {
	formNanoId: string;
	tabName?: string;
};

type WsPathParams = {
	wsNanoId?: string;
};

const Routes = {
	ROOT: Paths.Root,
	SIGN_IN: Paths.Signin,
	CREATE: Paths.Create,

	WS: `${Paths.WS}/:wsNanoId`,
	FORM: `${Paths.Form}/:formNanoId/:tabName?`,
} as const;

export { Paths, type FormPathParams, type WsPathParams, Routes, Tabs };
