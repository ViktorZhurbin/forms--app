import { useSelectedBlockId } from "@/shared/hooks/useSelectedBlockId";
import { useOrderedFormFields } from "@/shared/models/field/read";

export const useCurrentField = () => {
	const orderedFields = useOrderedFormFields();
	const selectedBlockId = useSelectedBlockId();

	const currentFieldIndex = orderedFields?.findIndex(
		(field) => field.nanoId === selectedBlockId,
	);

	const index = currentFieldIndex ?? null;

	const field = index !== null && orderedFields?.[index];
	const order = index === null ? 1 : index + 1;
	const isLast = order === orderedFields?.length;

	return { field, order, isLast };
};
