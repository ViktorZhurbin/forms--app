import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { HeaderIconButton } from "../HeaderIconButton/HeaderIconButton";

export const DarkModeToggle = () => {
	const { setColorScheme } = useMantineColorScheme();

	const computedColorScheme = useComputedColorScheme("light");

	const toggleColorScheme = () => {
		setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
	};

	return (
		<HeaderIconButton
			onClick={toggleColorScheme}
			icon={computedColorScheme === "dark" ? <IconSun /> : <IconMoon />}
		/>
	);
};
