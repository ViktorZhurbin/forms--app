import { Routes } from "@/shared/constants/location";
import { useCurrentFormWorkspace } from "@/shared/models/forms/read";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { Link } from "wouter";

export const HomeButton = () => {
	const currentWorkspace = useCurrentFormWorkspace();

	const workspaceId = currentWorkspace?.id;
	const path = Routes.getAdminPath({ workspaceId });

	return (
		<Tooltip withArrow label="Home">
			<ActionIcon variant="default" size="lg" component={Link} href={path}>
				<IconHome />
			</ActionIcon>
		</Tooltip>
	);
};
