import { SearchParams } from "@/shared/constants/location";
import { navigate } from "wouter/use-browser-location";

export const removeSelectedBlockId = () => {
	const url = new URL(window.location.href);
	url.searchParams.delete(SearchParams.BLOCK_ID);

	navigate(url);
};
