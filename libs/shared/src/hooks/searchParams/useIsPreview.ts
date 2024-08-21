import { SearchParams } from "~/constants/location";
import { ModalIds } from "~/constants/modals";
import { useSearchMatch } from "./useSearchMatch";

export const useIsPreview = () => {
	return useSearchMatch(SearchParams.MODAL, ModalIds.PREVIEW);
};
