import { DarkModeToggle } from "@/shared/components/DarkModeToggle/DarkModeToggle";
import { Group } from "@mantine/core";
import { UserMenu } from "./UserMenu/UserMenu";

export const Header = () => {
	return (
		<Group align="center" gap={8} flex={1} justify="end">
			<DarkModeToggle />
			<UserMenu />
		</Group>
	);
};
