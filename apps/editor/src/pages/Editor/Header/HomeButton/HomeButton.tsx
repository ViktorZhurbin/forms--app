import { ActionIcon, Tooltip } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { Link } from "wouter";
import { useWsPath } from "../../hooks/useWsPath";

export const HomeButton = () => {
	const wsPath = useWsPath();

	return (
		<Tooltip withArrow label="Home">
			<ActionIcon
				variant="default"
				size="lg"
				component={Link}
				href={`~${wsPath}`}
			>
				<IconHome />
			</ActionIcon>
		</Tooltip>
	);
};
