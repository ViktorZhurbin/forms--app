import { db } from "@/shared/models/db";
import { Avatar, Menu, UnstyledButton } from "@mantine/core";
// import { IconSettings } from "@tabler/icons-react";

export const AvatarMenu = () => {
	const handleSignOut = () => {
		db.auth.signOut();
	};

	return (
		<Menu shadow="md" width={200} offset={4}>
			<Menu.Target>
				<Avatar component={UnstyledButton} />
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item disabled>What's new</Menu.Item>
				<Menu.Divider />
				<Menu.Item disabled /* leftSection={<IconSettings />} */>
					Settings
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item onClick={handleSignOut}>Log out</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};
