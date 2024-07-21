import { useWorkspaceId } from "~/hooks/useWorkspaceId";
import { useDbQuery } from "../db";

const useCurrentWorkspaceWithFormsQuery = () => {
	const workspaceId = useWorkspaceId() ?? "";

	return useDbQuery({
		workspaces: {
			$: { where: { id: workspaceId } },
			forms: {},
		},
	});
};

export { useCurrentWorkspaceWithFormsQuery };
