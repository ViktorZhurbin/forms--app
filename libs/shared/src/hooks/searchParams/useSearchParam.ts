import { useSearch } from "wouter";

export const useSearchParam = (key: string) => {
	const search = useSearch();
	const params = new URLSearchParams(search);

	return params.get(key);
};
