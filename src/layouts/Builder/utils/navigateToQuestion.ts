import { navigate } from "wouter/use-browser-location";
import { SearchParams } from "~/constants/location";
import type { TQuestion } from "~/models/questions/schema";

export const navigateToQuestion = (id: TQuestion["id"]) => {
	const url = new URL(window.location.href);
	url.searchParams.set(SearchParams.BLOCK_ID, id);

	navigate(url);
};
