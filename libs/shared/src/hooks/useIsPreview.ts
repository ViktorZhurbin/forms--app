import { useSearch } from "wouter";

export const useIsPreview = () => {
	const queryString = useSearch();

	return queryString.includes("preview");
};
