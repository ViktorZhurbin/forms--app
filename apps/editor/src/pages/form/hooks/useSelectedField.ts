import { useSelectedBlockId } from "@/shared/hooks/useSelectedBlockId";
import { useFormDraftFields } from "@/shared/models/field/read";

export const useSelectedField = () => {
	const fields = useFormDraftFields();
	const selectedBlockId = useSelectedBlockId();

	return fields?.find((field) => field.nanoId === selectedBlockId);
};
