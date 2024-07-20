import { getInitialPrefersDark } from "./getPrefersDark";
import { setPrefersDark } from "./setPrefersDark";

export const watchSystemTheme = () => {
	// initial setup
	const prefersDark = getInitialPrefersDark();
	setPrefersDark(prefersDark);

	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", ({ matches }) => {
			setPrefersDark(matches);
		});
};
