import { Button, Group, UnstyledButton } from "@mantine/core";
import { IconBolt } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";
import { AvatarMenu } from "./AvatarMenu/AvatarMenu";

export const Header = () => {
	return (
		<Group h="100%" px="md" align="center" justify="space-between">
			<UnstyledButton
				onClick={() => {
					navigate("/");
				}}
			>
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
				<AvatarMenu />
			</Group>
		</Group>
	);
};
