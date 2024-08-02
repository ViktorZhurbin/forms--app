import { Button, Group } from "@mantine/core";
import { IconBolt } from "@tabler/icons-react";
import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { AvatarMenu } from "./AvatarMenu/AvatarMenu";

export const Header = () => {
	return (
		<Group align="center" gap={8} flex={1} justify="end">
			<Button
				disabled
				variant="default"
				leftSection={<IconBolt color="orange" />}
			>
				Upgrade
			</Button>
			<DarkModeToggle />
			<AvatarMenu />
		</Group>
	);
};
