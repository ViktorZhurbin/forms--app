import { IconButton } from "@/shared/components/IconButton/IconButton";
import { FieldTypes } from "@/shared/constants/field";
import { useAddField } from "@/shared/models/field/hooks/useAddField";
import { IconPlus } from "@tabler/icons-react";
import { useCallback } from "react";
import { navigateToFieldId } from "~/pages/form/utils/navigateToFieldId";

export const AddEndingButton = () => {
	const { addField } = useAddField();

	const handleAddBlock = useCallback(async () => {
		const { nanoId } = await addField({ type: FieldTypes.Ending });

		navigateToFieldId({ nanoId });
	}, [addField]);

	return (
		<IconButton size="sm" tooltip="Add ending" onClick={handleAddBlock}>
			<IconPlus />
		</IconButton>
	);
};
