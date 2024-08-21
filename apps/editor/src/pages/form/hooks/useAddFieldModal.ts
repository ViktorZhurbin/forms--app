import { SearchParams } from "@/shared/constants/location";
import { ModalIds } from "@/shared/constants/modals";
import { useModal } from "@/shared/hooks/useModal";

export const useAddFieldModal = (params: { insertBefore?: boolean }) => {
	const { insertBefore } = params;

	const searchParams =
		insertBefore !== undefined
			? { [SearchParams.INSERT_BEFORE]: String(insertBefore) }
			: undefined;

	return useModal(ModalIds.ADD_FIELD, searchParams);
};
