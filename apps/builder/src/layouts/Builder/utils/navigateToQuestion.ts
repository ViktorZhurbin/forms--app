import { SearchParams } from "@/shared/constants/location";
import type { TQuestion } from "@/shared/models/forms/schema/questions";
import { navigate } from "wouter/use-browser-location";

export const navigateToQuestion = ({
	nanoId,
}: { nanoId: TQuestion["nanoId"] }) => {
	const url = new URL(window.location.href);
	url.searchParams.set(SearchParams.BLOCK_ID, nanoId);

	navigate(url);
};
