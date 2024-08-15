import { useCallback } from "react";
import type { FieldTypes } from "~/constants/field";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useSelectedBlockId } from "~/hooks/useSelectedBlockId";
import { getCreateFieldPayload } from "../../helpers/getCreateFieldPayload";
import { getNewFieldOrder } from "../../helpers/getNewFieldOrder";
import { useOrderedFormFields } from "../../read";
import { createField, updateFieldsIndex } from "../../write";

type AddFieldParams = {
	type: FieldTypes;
	insertBefore?: boolean;
};

export const useAddField = () => {
	const formNanoId = useFormNanoId();
	const selectedFieldId = useSelectedBlockId();
	const orderedFields = useOrderedFormFields();

	const selectedFieldIndex = orderedFields?.findIndex(
		({ nanoId }) => nanoId === selectedFieldId,
	);

	const addField = useCallback(
		async ({ type, insertBefore }: AddFieldParams) => {
			const newFieldIndex = getNewFieldOrder({
				insertBefore,
				selectedFieldIndex,
			});

			const newField = getCreateFieldPayload({ type, index: newFieldIndex });

			await createField({
				formNanoId,
				payload: newField,
			});

			// maintain array-like order of fields
			const newFieldNanoIds = orderedFields
				.toSpliced(newFieldIndex, 0, newField)
				.map(({ nanoId }) => nanoId);

			await updateFieldsIndex(newFieldNanoIds);

			return { nanoId: newField.nanoId };
		},
		[formNanoId, orderedFields, selectedFieldIndex],
	);

	return { addField };
};
