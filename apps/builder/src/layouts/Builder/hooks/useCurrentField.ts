import { useSelectedBlockId } from "@/shared/hooks/useSelectedBlockId";
import { useOrderedFormFields } from "@/shared/models/field/read";

export const useCurrentField = () => {
	const fields = useOrderedFormFields();
	const selectedBlockId = useSelectedBlockId();

	const index =
		fields?.findIndex((field) => field.nanoId === selectedBlockId) ?? null;

	const field = index !== null && fields?.[index];
	const order = index === null ? 1 : index + 1;
	const isLast = order === fields?.length;

	return { field, order, isLast };
};
