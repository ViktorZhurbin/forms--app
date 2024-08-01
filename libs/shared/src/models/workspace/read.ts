import { useWorkspaceNanoId } from "~/hooks/useWorkspaceNanoId";
import { useDbQuery } from "../db";

const useCurrentWorkspaceWithFormsQuery = () => {
	const nanoId = useWorkspaceNanoId() ?? "";

	return useDbQuery({
		workspaces: {
			$: { where: { nanoId } },
			forms: { responses: {} },
		},
	});
};

export { useCurrentWorkspaceWithFormsQuery };
