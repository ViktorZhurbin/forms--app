import { navigate } from "wouter/use-browser-location";

const setSearchParams = (params: Record<string, string | number | null>) => {
	const url = new URL(window.location.href);

	for (const [key, value] of Object.entries(params)) {
		if (value === null) {
			url.searchParams.delete(key);
		} else {
			url.searchParams.set(key, value.toString());
		}
	}

	navigate(url);
};

export { setSearchParams };
