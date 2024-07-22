import { useWorkspaceNanoId } from "~/hooks/useWorkspaceNanoId";
import { useDbQuery } from "../db";

const useCurrentWorkspaceWithFormsQuery = () => {
	const nanoid = useWorkspaceNanoId() ?? "";

	return useDbQuery({
		workspaces: {
			$: { where: { nanoid } },
			forms: {},
		},
	});
};

export { useCurrentWorkspaceWithFormsQuery };
