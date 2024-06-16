import { ActionIcon, Tooltip } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";

export const HomeButton = () => {
	return (
		<Tooltip withArrow label="Home">
			<ActionIcon
				variant="default"
				size="lg"
				onClick={() => {
					navigate("/");
				}}
			>
				<IconHome />
			</ActionIcon>
		</Tooltip>
	);
};
