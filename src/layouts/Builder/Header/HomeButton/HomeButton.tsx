import { ActionIcon, Tooltip } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";

export const HomeButton = () => {
	return (
		<Tooltip withArrow label="Home">
			<ActionIcon variant="default" size="lg" component="a" href="/">
				<IconHome />
			</ActionIcon>
		</Tooltip>
	);
};
