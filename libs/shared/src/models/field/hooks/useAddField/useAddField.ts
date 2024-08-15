import { useCallback } from "react";
import type { FieldTypes } from "~/constants/field";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useSelectedBlockId } from "~/hooks/useSelectedBlockId";
import { getCreateFieldPayload } from "../../helpers/getCreateFieldPayload";
import { getNewFieldOrder } from "../../helpers/getNewFieldOrder";
import { useOrderedFormDraftFields } from "../../read";
import { createField } from "../../write";

type AddFieldParams = {
	type: FieldTypes;
	insertBefore?: boolean;
};

export const useAddField = () => {
	const formNanoId = useFormNanoId();
	const selectedFieldId = useSelectedBlockId();
	const orderedFields = useOrderedFormDraftFields();

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

			const updateFieldIndecies = orderedFields.flatMap(({ id }, index) => {
				if (index >= newField.index) return { id, index: index + 1 };

				return [];
			});

			await createField({
				formNanoId,
				newField,
				updateFieldIndecies,
			});

			return { nanoId: newField.nanoId };
		},
		[formNanoId, orderedFields, selectedFieldIndex],
	);

	return { addField };
};
