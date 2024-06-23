import { NavLink, Text } from "@mantine/core";

export const NavThankYou = () => {
	return (
		<>
			{" "}
			<Text c="dimmed" size="sm" mb={8} p="0 12px">
				Thank you page
			</Text>
			<NavLink p="8px 12px" label="Page 1" />
		</>
	);
};
