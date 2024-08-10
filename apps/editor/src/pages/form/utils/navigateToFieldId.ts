import { SearchParams } from "@/shared/constants/location";
import type { TField } from "@/shared/models/field/schema";
import { setSearchParams } from "~/utils/searchParams";

const navigateToFieldId = ({ nanoId }: { nanoId: TField["nanoId"] | null }) => {
	setSearchParams({ [SearchParams.BLOCK_ID]: nanoId });
};

export { navigateToFieldId };
