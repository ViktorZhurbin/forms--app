import { SearchParams } from "@/shared/constants/editor.routes";
import type { TField } from "@/shared/models/field/schema";
import { navigate } from "wouter/use-browser-location";

export const navigateToField = ({ nanoId }: { nanoId: TField["nanoId"] }) => {
	const url = new URL(window.location.href);
	url.searchParams.set(SearchParams.BLOCK_ID, nanoId);

	navigate(url);
};
