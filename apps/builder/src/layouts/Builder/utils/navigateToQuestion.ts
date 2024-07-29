import { SearchParams } from "@/shared/constants/routes";
import type { TQuestion } from "@/shared/models/form/schema/question";
import { navigate } from "wouter/use-browser-location";

export const navigateToQuestion = ({
	nanoId,
}: { nanoId: TQuestion["nanoId"] }) => {
	const url = new URL(window.location.href);
	url.searchParams.set(SearchParams.BLOCK_ID, nanoId);

	navigate(url);
};
