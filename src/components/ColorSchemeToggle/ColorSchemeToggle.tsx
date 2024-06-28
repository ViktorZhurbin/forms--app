import {
	ActionIcon,
	useComputedColorScheme,
	useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export const ColorSchemeToggle = () => {
	const { setColorScheme } = useMantineColorScheme();

	const computedColorScheme = useComputedColorScheme("light");

	const toggleColorScheme = () => {
		setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
	};

	return (
		<ActionIcon variant="default" onClick={toggleColorScheme}>
			{computedColorScheme === "dark" ? <IconSun /> : <IconMoon />}
		</ActionIcon>
	);
};
