import { LocalStorage } from "~/constants/localStorage";

export const getInitialPrefersDark = () => {
	try {
		const userPrefersDark = window.localStorage.getItem(
			LocalStorage.PrefersDark
		);

		if (userPrefersDark === null) {
			const systemPrefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;

			return systemPrefersDark;
		} else {
			return userPrefersDark === "true";
		}
	} catch {
		return false;
	}
};
