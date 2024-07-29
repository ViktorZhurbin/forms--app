import { id, lookup, tx } from "@instantdb/react";
import { useCallback } from "react";
import type { FieldTypes } from "~/constants/fields";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useSelectedBlockId } from "~/hooks/useSelectedBlockId";
import { dbTransact } from "~/models/db";
import { getCreateFieldPayload } from "../../helpers/getCreateFieldPayload";
import { getNewFieldOrder } from "../../helpers/getNewFieldOrder";
import { useOrderedFormFields } from "../../read";

type AddFieldParams = {
	type: FieldTypes;
	insertBefore?: boolean;
};

export const useAddField = () => {
	const formNanoId = useFormNanoId();
	const selectedFieldId = useSelectedBlockId();
	const orderedFields = useOrderedFormFields() ?? [];

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

			// maintain array-like order of fields
			const updateOrderOps = orderedFields.map(({ id }, index) => {
				const newIndex = index >= newFieldIndex ? index + 1 : index;

				return tx.fields[id].update({ index: newIndex });
			});

			const createFieldOp = tx.fields[id()]
				.update(newField)
				.link({ forms: lookup("nanoId", formNanoId) });

			await dbTransact([createFieldOp].concat(updateOrderOps));

			return { nanoId: newField.nanoId };
		},
		[formNanoId, orderedFields, selectedFieldIndex],
	);

	return { addField };
};
