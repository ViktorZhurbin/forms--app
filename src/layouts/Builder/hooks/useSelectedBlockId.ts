import { useSearch } from "wouter";
import { navigate } from "wouter/use-browser-location";
import { SearchParams } from "~/constants/location";

export const useSelectedBlockId = (defaultBlockId?: string) => {
	const queryString = useSearch();
	const searchParams = new URLSearchParams(queryString);
	const selectedBlockId = searchParams.get(SearchParams.BLOCK_ID);

	if (!selectedBlockId && defaultBlockId) {
		const url = new URL(window.location.href);
		url.searchParams.set(SearchParams.BLOCK_ID, defaultBlockId);

		navigate(`${url.pathname}${url.search}`);

		return defaultBlockId;
	}

	return selectedBlockId;
};
