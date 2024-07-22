import { Routes } from "@/shared/constants/routes";
import { useLocalDemoNanoId } from "@/shared/hooks/useLocalDemoNanoId";
import { useCurrentForm } from "@/shared/models/forms/read";
import { linkFormToWorkspace } from "@/shared/models/forms/write";
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

	const formId = useCurrentForm()?.id;
	const [, , removeDemoLocalNanoId] = useLocalDemoNanoId();

	useEffect(() => {
		const firstWsNanoId = dbUser?.workspaces[0]?.nanoId;

		if (isLoading || !firstWsNanoId) return;

		if (formId) {
			linkFormToWorkspace({
				formId,
				wsNanoId: firstWsNanoId,
			});
		}

		removeDemoLocalNanoId();

		navigate(Routes.getAdminPath({ wsNanoId: firstWsNanoId }));
	}, [isLoading, formId, dbUser, removeDemoLocalNanoId]);

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
		}).then();
	}, [dbUser]);

	return <FullScreenLoader />;
};
