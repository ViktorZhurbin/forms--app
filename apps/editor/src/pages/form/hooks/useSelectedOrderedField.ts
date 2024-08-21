import { useSelectedBlockId } from "@/shared/hooks/searchParams/useSelectedBlockId";
import { useOrderedFormDraftFields } from "@/shared/models/field/read";
import { isQuestionFieldType } from "@/shared/utils/fieldPredicates";

export const useSelectedOrderedField = () => {
	const allFieldsOrdered = useOrderedFormDraftFields();
	const questionFields = allFieldsOrdered?.filter((field) =>
		isQuestionFieldType(field.type),
	);

	const selectedBlockId = useSelectedBlockId();

	const field = allFieldsOrdered?.find(
		(field) => field.nanoId === selectedBlockId,
	);

	const getOrder = () => {
		if (!field || !isQuestionFieldType(field.type)) return null;

		const questionIndex = questionFields.findIndex(
			(field) => field.nanoId === selectedBlockId,
		);

		return questionIndex + 1;
	};

	const order = getOrder();

	const isLastQuestion = order === questionFields?.length;

	return { field, order, isLastQuestion };
};
