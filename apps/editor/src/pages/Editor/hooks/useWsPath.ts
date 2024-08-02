import { useCurrentFormWorkspace } from "@/shared/models/form/read";
import { RouteUtils } from "~/utils/routes";

export const useWsPath = () => {
	const currentWorkspace = useCurrentFormWorkspace();

	const wsNanoId = currentWorkspace?.nanoId;

	return RouteUtils.getWsPath({ wsNanoId });
};
