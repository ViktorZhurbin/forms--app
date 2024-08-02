import { Paths } from "~/constants/routes";

const RouteUtils = {
	getWsPath(params: { wsNanoId?: string }) {
		const { wsNanoId } = params;

		return wsNanoId ? `/${Paths.WS}/${wsNanoId}` : Paths.Root;
	},

	getFormPath(params: { formNanoId: string }) {
		const { formNanoId } = params;

		return `/${Paths.Form}/${formNanoId}`;
	},
};

export { RouteUtils };
