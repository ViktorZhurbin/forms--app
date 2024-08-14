import {
	ActionIcon,
	useComputedColorScheme,
	useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export const DarkModeToggle = () => {
	const { setColorScheme } = useMantineColorScheme();

	const computedColorScheme = useComputedColorScheme("light");

	const toggleColorScheme = () => {
		setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
	};

	return (
		<ActionIcon size="lg" variant="default" onClick={toggleColorScheme}>
			{computedColorScheme === "dark" ? <IconSun /> : <IconMoon />}
		</ActionIcon>
	);
};
