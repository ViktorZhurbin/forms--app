import { Button, Group, UnstyledButton } from "@mantine/core";
import { IconBolt } from "@tabler/icons-react";
import { Link } from "wouter";
import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { AvatarMenu } from "./AvatarMenu/AvatarMenu";

export const Header = () => {
	return (
		<Group h="100%" px="md" align="center" justify="space-between">
			<UnstyledButton component={Link} href="/">
				Logo
			</UnstyledButton>
			<Group align="center" gap={8}>
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
		</Group>
	);
};
