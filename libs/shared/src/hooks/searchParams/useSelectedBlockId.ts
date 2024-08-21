import { useEffect, useState } from "react";
import { navigate } from "wouter/use-browser-location";
import { SearchParams } from "~/constants/location";
import { useSearchParam } from "./useSearchParam";

export const useSelectedBlockId = (defaultBlockId?: string) => {
	const blockId = useSearchParam(SearchParams.BLOCK_ID);

	const [selectedBlockId, setSelectedBlockId] = useState<string>();

	useEffect(() => {
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
	}, [blockId, defaultBlockId]);

	return selectedBlockId;
};
