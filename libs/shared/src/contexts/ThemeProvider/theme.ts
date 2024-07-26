import { type MantineThemeOverride, createTheme } from "@mantine/core";
import { darkPresets } from "./dark";

export const theme: MantineThemeOverride = createTheme({
	// autoContrast: true,
	// defaultRadius: 6,
	colors: {
		dark: darkPresets.mantineDefaultAdjusted,
	},
});
