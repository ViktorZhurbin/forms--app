import { ActionIcon, Tooltip } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { Link } from "wouter";
import { useAdminPath } from "../../hooks/useAdminPath";

export const HomeButton = () => {
	const path = useAdminPath();

	return (
		<Tooltip withArrow label="Home">
			<ActionIcon variant="default" size="lg" component={Link} href={path}>
				<IconHome />
			</ActionIcon>
		</Tooltip>
	);
};
