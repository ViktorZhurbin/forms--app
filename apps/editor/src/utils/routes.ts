import {
	type FormPathParams,
	Paths,
	type WsPathParams,
} from "~/constants/routes";

const RouteUtils = {
	getWsPath(params: WsPathParams) {
		const { wsNanoId } = params;

		return wsNanoId ? `${Paths.WS}/${wsNanoId}` : Paths.Root;
	},

	getFormPath(params: FormPathParams) {
		const { formNanoId, tabName } = params;

		return `${Paths.Form}/${formNanoId}${tabName ? `/${tabName}` : ""}`;
	},
};

export { RouteUtils };
