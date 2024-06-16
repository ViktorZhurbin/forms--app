import { useEffect, useMemo } from "react";
import { useSearch } from "wouter";
import { navigate } from "wouter/use-browser-location";
import { SearchParams } from "../../../constants/location";
import { formFields } from "../../../mocks/formQuestions";
import type { SelectedBlockId } from "../types";

export const useSelectedBlockId = () => {
	const searchParams = useSearch();

	const selectedBlockId: SelectedBlockId = useMemo(() => {
		const urlSearchParams = new URLSearchParams(searchParams);

		return urlSearchParams.get(SearchParams.BLOCK_ID);
	}, [searchParams]);

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const searchBlockId = urlSearchParams.get(SearchParams.BLOCK_ID);
		const isValidBlockId = formFields.some(({ id }) => id === searchBlockId);

		if (searchBlockId && isValidBlockId) {
			return;
		}

		const defaultBlockId = formFields[0].id;

		urlSearchParams.set(SearchParams.BLOCK_ID, defaultBlockId);
		navigate(`?${urlSearchParams.toString()}`, { replace: true });
	}, []);

	return selectedBlockId;
};
