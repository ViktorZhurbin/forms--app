import { navigate } from "wouter/use-browser-location";

const navigateWithSearch = (
	params: Record<string, string | number | boolean | null>,
	path = "",
) => {
	const url = new URL(path, window.location.href);

	for (const [key, value] of Object.entries(params)) {
		if (value === null) {
			url.searchParams.delete(key);
		} else {
			url.searchParams.set(key, value.toString());
		}
	}

	navigate(url);
};

export { navigateWithSearch };
