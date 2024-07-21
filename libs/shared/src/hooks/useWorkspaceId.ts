import { useParams } from "wouter";

export const useWorkspaceId = () => {
	const params = useParams<{ workspaceId?: string; formId?: string }>();

	return params.workspaceId;
};
