import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { HeaderIconButton } from "../HeaderIconButton/HeaderIconButton";

export const DarkModeToggle = (props: { tabIndex?: number }) => {
	const { tabIndex } = props;

	const { setColorScheme } = useMantineColorScheme();

	const computedColorScheme = useComputedColorScheme("light");

	const toggleColorScheme = () => {
		setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
	};

	return (
		<HeaderIconButton
			tabIndex={tabIndex}
			onClick={toggleColorScheme}
			icon={computedColorScheme === "dark" ? <IconSun /> : <IconMoon />}
		/>
	);
};
