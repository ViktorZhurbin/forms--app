import { useParams } from "wouter";

export const useWorkspaceNanoId = () => {
	return useParams().wsNanoId;
};
