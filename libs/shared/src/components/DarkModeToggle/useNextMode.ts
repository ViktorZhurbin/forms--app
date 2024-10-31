import { useComputedColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

const NEXT_MODE_VALUES = {
	light: {
		colorScheme: "dark",
		tooltip: "Dark mode",
		Icon: IconMoon,
	},
	dark: {
		colorScheme: "light",
		tooltip: "Light mode",
		Icon: IconSun,
	},
} as const;

export const useNextMode = () => {
	const computedColorScheme = useComputedColorScheme("light");

	return NEXT_MODE_VALUES[computedColorScheme];
};
