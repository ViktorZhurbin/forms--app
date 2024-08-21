import { useMemo } from "react";
import { SearchParams } from "~/constants/location";
import type { ModalIds } from "~/constants/modals";
import { navigateWithSearch } from "~/utils/searchParams";
import { useSearchMatch } from "./searchParams/useSearchMatch";

export const useModal = (id: ModalIds) => {
	const isOpen = useSearchMatch(SearchParams.MODAL, id);

	const modalActions = useMemo(() => {
		return {
			open: () => navigateWithSearch({ [SearchParams.MODAL]: id }),
			close: () => navigateWithSearch({ [SearchParams.MODAL]: null }),
		};
	}, [id]);

	return {
		isOpen,
		modalActions,
	};
};
