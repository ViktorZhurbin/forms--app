import { useEffect, useState } from "react";
import { useSearch } from "wouter";
import { navigate } from "wouter/use-browser-location";
import { SearchParams } from "~/constants/location";

export const useSelectedBlockId = (defaultBlockId?: string) => {
	const queryString = useSearch();

	const [selectedBlockId, setSelectedBlockId] = useState<string>();

	useEffect(() => {
		const searchParams = new URLSearchParams(queryString);
		const blockId = searchParams.get(SearchParams.BLOCK_ID);

		if (blockId) {
			setSelectedBlockId(blockId);
			return;
		}

		if (defaultBlockId) {
			const url = new URL(window.location.href);
			url.searchParams.set(SearchParams.BLOCK_ID, defaultBlockId);

			navigate(`${url.pathname}${url.search}`);

			setSelectedBlockId(defaultBlockId);
		}
	}, [queryString, defaultBlockId]);

	return selectedBlockId;
};
