import { IconButton } from "@/shared/components/IconButton/IconButton";
import { db } from "@/shared/models/db";
import { Menu } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";

export const UserMenu = () => {
	const handleSignOut = () => {
		db.auth.signOut();
	};

	return (
		<Menu shadow="md" width={200} offset={4}>
			<Menu.Target>
				<div>
					<IconButton>
						<IconUserCircle stroke={1.5} style={{ width: 20, height: 20 }} />
					</IconButton>
				</div>
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
