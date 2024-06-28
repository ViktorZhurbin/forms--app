import { ActionIcon, Tooltip } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { Link } from "wouter";

export const HomeButton = () => {
	return (
		<Tooltip withArrow label="Home">
			<ActionIcon variant="default" size="lg" component={Link} href="/">
				<IconHome />
			</ActionIcon>
		</Tooltip>
	);
};
