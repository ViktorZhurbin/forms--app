import { Routes } from "@/shared/constants/location";
import { useUserWithWorkspacesQuery } from "@/shared/models/user/read";
import { createDbUser } from "@/shared/models/user/write";
import { createWorkspace } from "@/shared/models/workspace/write";
import type { User } from "@instantdb/react";
import { useEffect } from "react";
import { navigate } from "wouter/use-browser-location";
import { FullScreenLoader } from "~/components/FullScreenLoader/FullScreenLoader";

export const RedirectToWorkspace = ({ authUser }: { authUser: User }) => {
	const {
		error,
		isLoading,
		data: dbUser,
	} = useUserWithWorkspacesQuery({
		userId: authUser.id,
	});

	useEffect(() => {
		const firstWorkspaceId = dbUser?.workspaces[0]?.id;

		if (!isLoading && firstWorkspaceId) {
			navigate(Routes.getAdminPath({ workspaceId: firstWorkspaceId }));
		}
	}, [isLoading, dbUser]);

	useEffect(() => {
		const doesUserExist = !isLoading && !error && dbUser;

		if (doesUserExist) return;

		createDbUser({
			id: authUser.id,
			email: authUser.email,
		});
	}, [isLoading, error, dbUser, authUser]);

	useEffect(() => {
		const hasWorkspaces = !!dbUser?.workspaces.length;

		if (!dbUser || hasWorkspaces) return;

		createWorkspace({
			userId: dbUser.id,
			name: "My Workspace",
		});
	}, [dbUser]);

	return <FullScreenLoader />;
};
