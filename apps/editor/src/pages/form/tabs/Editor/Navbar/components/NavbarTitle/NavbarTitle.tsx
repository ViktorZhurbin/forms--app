import { Text } from "@mantine/core";

export const NavbarTitle = ({ children }: { children: string }) => (
	<Text c="dimmed" size="sm" p="0 12px">
		{children}
	</Text>
);
