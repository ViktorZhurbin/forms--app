import type { FieldTypes } from "@/shared/constants/field";
import { SearchParams } from "@/shared/constants/location";
import { useSearchParam } from "@/shared/hooks/searchParams/useSearchParam";
import { useAddField } from "@/shared/models/field/hooks/useAddField";
import { Modal } from "@mantine/core";
import { useCallback } from "react";
import { useAddFieldModal } from "~/pages/form/hooks/useAddFieldModal";
import { navigateToFieldId } from "~/pages/form/utils/navigateToFieldId";
import { AddBlockModalContent } from "./AddBlockModalContent/AddBlockModalContent";

export const AddBlockModal = () => {
	const { addField } = useAddField();

	const insertBefore = !!useSearchParam(SearchParams.INSERT_BEFORE);
	const { isOpen, modalActions } = useAddFieldModal({ insertBefore });

	const handleAddBlock = useCallback(
		async (type: FieldTypes) => {
			const { nanoId } = await addField({ type, insertBefore });

			navigateToFieldId({ nanoId });
			modalActions.close();
		},
		[insertBefore, modalActions.close, addField],
	);

	return (
		<Modal
			size="auto"
			padding="lg"
			title="Add content"
			opened={isOpen}
			onClose={modalActions.close}
		>
			<AddBlockModalContent onAddBlock={handleAddBlock} />
		</Modal>
	);
};
