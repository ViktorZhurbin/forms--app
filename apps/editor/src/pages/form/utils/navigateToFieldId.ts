import { SearchParams } from "@/shared/constants/location";
import type { TField } from "@/shared/models/field/schema";
import { navigateWithSearch } from "~/utils/searchParams";

const navigateToFieldId = (prams: { nanoId: TField["nanoId"] | null }) => {
	const { nanoId } = prams;

	navigateWithSearch({ [SearchParams.BLOCK_ID]: nanoId });
};

export { navigateToFieldId };
