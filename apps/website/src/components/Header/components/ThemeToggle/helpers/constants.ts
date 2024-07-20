const Theme = {
	Light: "light",
	Dark: "dark",
} as const;

type TTheme = (typeof Theme)[keyof typeof Theme];

const ToggleButtonId = "themeToggleButton";

export { Theme, type TTheme, ToggleButtonId };
