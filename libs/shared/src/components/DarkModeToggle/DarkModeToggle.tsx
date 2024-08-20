import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { IconButton } from "../IconButton/IconButton";

export const DarkModeToggle = (props: { tabIndex?: number }) => {
	const { tabIndex } = props;

	const { setColorScheme } = useMantineColorScheme();

	const computedColorScheme = useComputedColorScheme("light");

	const toggleColorScheme = () => {
		setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
	};

	return (
		<IconButton tabIndex={tabIndex} onClick={toggleColorScheme}>
			{computedColorScheme === "dark" ? <IconSun /> : <IconMoon />}
		</IconButton>
	);
};
