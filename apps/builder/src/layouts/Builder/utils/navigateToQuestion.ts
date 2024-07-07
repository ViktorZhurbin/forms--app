import { SearchParams } from "@/shared/constants/location";
import { navigate } from "wouter/use-browser-location";
import type { TQuestion } from "~/models/forms/schema/questions";

export const navigateToQuestion = (id: TQuestion["id"]) => {
	const url = new URL(window.location.href);
	url.searchParams.set(SearchParams.BLOCK_ID, id);

	navigate(url);
};
