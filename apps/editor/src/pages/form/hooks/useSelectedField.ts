import { useSelectedBlockId } from "@/shared/hooks/useSelectedBlockId";
import { useFormFields } from "@/shared/models/field/read";

export const useSelectedField = () => {
	const fields = useFormFields();
	const selectedBlockId = useSelectedBlockId();

	return fields?.find((field) => field.nanoId === selectedBlockId);
};
