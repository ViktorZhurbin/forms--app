import { DataAttributes } from "~/constants/dataAttributes";
import { LocalStorage } from "~/constants/localStorage";
import { Theme, ToggleButtonId } from "./constants";

export const setPrefersDark = (prefersDark: boolean) => {
	const nextTheme = prefersDark ? Theme.Dark : Theme.Light;

	const nextThemeName = nextTheme === Theme.Dark ? "Light" : "Dark";

	document
		.getElementById(ToggleButtonId)
		?.setAttribute(DataAttributes.Tooltip, `Switch to ${nextThemeName} mode`);

	document.documentElement.setAttribute(DataAttributes.Theme, nextTheme);

	try {
		window.localStorage.setItem(LocalStorage.PrefersDark, String(prefersDark));
	} catch {}
};
