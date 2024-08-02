import { Routes } from "@/shared/constants/routes";
import { useCurrentFormWorkspace } from "@/shared/models/form/read";

export const useAdminPath = () => {
	const currentWorkspace = useCurrentFormWorkspace();

	const wsNanoId = currentWorkspace?.nanoId;

	return Routes.getAdminPath({ wsNanoId });
};
