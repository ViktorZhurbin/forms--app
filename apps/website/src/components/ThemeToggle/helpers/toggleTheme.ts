import { DataAttributes } from "~/constants/dataAttributes";
import { Theme } from "./constants";
import { setPrefersDark } from "./setPrefersDark";

export const toggleTheme = () => {
	const currentTheme = document.documentElement.getAttribute(
		DataAttributes.Theme,
	);

	const shouldSwitchToDark = currentTheme === Theme.Light;

	setPrefersDark(shouldSwitchToDark);
};
