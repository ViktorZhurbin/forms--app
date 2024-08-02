import { EditorRouteUtils } from "@/shared/constants/editor.routes";
import { useCurrentFormWorkspace } from "@/shared/models/form/read";

export const useAdminPath = () => {
	const currentWorkspace = useCurrentFormWorkspace();

	const wsNanoId = currentWorkspace?.nanoId;

	return EditorRouteUtils.getWsPath({ wsNanoId });
};
