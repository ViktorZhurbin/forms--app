import { Button, Group, UnstyledButton } from "@mantine/core";
import { IconBolt } from "@tabler/icons-react";
import { ColorSchemeToggle } from "~/components/ColorSchemeToggle/ColorSchemeToggle";
import { AvatarMenu } from "./AvatarMenu/AvatarMenu";

export const Header = () => {
	return (
		<Group h="100%" px="md" align="center" justify="space-between">
			<UnstyledButton component="a" href="/">
				Logo
			</UnstyledButton>
			<Group align="center" gap={8}>
				<ColorSchemeToggle />
				<Button
					disabled
					variant="default"
					leftSection={<IconBolt color="orange" />}
				>
					Upgrade
				</Button>
				<AvatarMenu />
			</Group>
		</Group>
	);
};
