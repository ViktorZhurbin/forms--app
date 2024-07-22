import { Routes } from "@/shared/constants/routes";
import { useCurrentFormWorkspace } from "@/shared/models/forms/read";

export const useAdminPath = () => {
	const currentWorkspace = useCurrentFormWorkspace();

	const wsNanoId = currentWorkspace?.nanoId;

	return Routes.getAdminPath({ wsNanoId });
};
