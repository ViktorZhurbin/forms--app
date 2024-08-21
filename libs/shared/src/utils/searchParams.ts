import { navigate } from "wouter/use-browser-location";

const navigateWithSearch = (
	params: Record<string, string | number | null>,
	urlParam = window.location.href,
) => {
	const url = new URL(urlParam);

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
