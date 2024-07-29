import { useCallback } from "react";
import type { QuestionTypes } from "~/constants/questions";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useSelectedBlockId } from "~/hooks/useSelectedBlockId";
import { getCreateFieldPayload } from "../../helpers/getCreateFieldPayload";
import { getNewFieldOrder } from "../../helpers/getNewFieldOrder";
import { useOrderedFormFields } from "../../read";
import { createField, updateFieldsOrder } from "../../write";

type AddFieldParams = {
	type: QuestionTypes;
	insertBefore?: boolean;
};

export const useAddField = () => {
	const formNanoId = useFormNanoId();
	const selectedFieldId = useSelectedBlockId();
	const fields = useOrderedFormFields() ?? [];

	const selectedFieldOrder = fields?.findIndex(
		({ nanoId }) => nanoId === selectedFieldId,
	);

	const addField = useCallback(
		async ({ type, insertBefore }: AddFieldParams) => {
			const newFieldOrder = getNewFieldOrder({
				insertBefore,
				selectedFieldOrder,
			});

			const newField = getCreateFieldPayload({ type, order: newFieldOrder });

			const newFieldNanoId = await createField({
				formNanoId,
				payload: newField,
			});

			const orderedFieldsIds = fields
				.map(({ id }) => id)
				.toSpliced(newField.order, 0, newField.id);

			await updateFieldsOrder(orderedFieldsIds);

			return { nanoId: newFieldNanoId };
		},
		[formNanoId, fields, selectedFieldOrder],
	);

	return { addField };
};
