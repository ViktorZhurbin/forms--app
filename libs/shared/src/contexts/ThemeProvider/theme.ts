import { type MantineThemeOverride, createTheme } from "@mantine/core";
import { darkPresets } from "./dark";

export const theme: MantineThemeOverride = createTheme({
	// autoContrast: true,
	// defaultRadius: 6,
	cursorType: "pointer",
	// primaryColor: "pink",
	colors: {
		// https://park-ui.com/react/docs/theme/colors#gray-colors
		dark: darkPresets.mantineDefaultAdjusted,
	},
});
