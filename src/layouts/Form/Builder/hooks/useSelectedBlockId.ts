import { useSearch } from "wouter";
import { SearchParams } from "~/constants/location";

export const useSelectedBlockId = () => {
	const queryString = useSearch();
	const searchParams = new URLSearchParams(queryString);

	return searchParams.get(SearchParams.BLOCK_ID);
};
