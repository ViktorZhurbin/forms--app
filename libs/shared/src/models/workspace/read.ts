import { useWorkspaceNanoId } from "~/hooks/useWorkspaceNanoId";
import { useQuery } from "../db";

const useCurrentWorkspaceWithFormsQuery = () => {
	const nanoId = useWorkspaceNanoId() ?? "";

	return useQuery({
		workspaces: {
			$: { where: { nanoId } },
			forms: { responses: {} },
		},
	});
};

export { useCurrentWorkspaceWithFormsQuery };
