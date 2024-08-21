import { useMemo } from "react";
import { SearchParams } from "~/constants/location";
import type { ModalIds } from "~/constants/modals";
import { navigateWithSearch } from "~/utils/searchParams";
import { useSearchMatch } from "./searchParams/useSearchMatch";

export const useModal = (
	id: ModalIds,
	params?: Record<string, string | number | null>,
) => {
	const isOpen = useSearchMatch(SearchParams.MODAL, id);

	const modalActions = useMemo(() => {
		return {
			open: () =>
				navigateWithSearch({ [SearchParams.MODAL]: id, ...(params ?? {}) }),

			close: () => {
				const removedParams = Object.keys(params ?? {}).reduce<
					Record<string, null>
				>((acc, key) => {
					acc[key] = null;

					return acc;
				}, {});

				navigateWithSearch({ [SearchParams.MODAL]: null, ...removedParams });
			},
		};
	}, [id, params]);

	return {
		isOpen,
		modalActions,
	};
};
