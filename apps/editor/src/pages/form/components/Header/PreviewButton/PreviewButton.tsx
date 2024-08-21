import { IconButton } from "@/shared/components/IconButton/IconButton";
import { ModalIds } from "@/shared/constants/modals";
import { useModal } from "@/shared/hooks/useModal";
import { useFormDraftFields } from "@/shared/models/field/read";
import { IconEye } from "@tabler/icons-react";
import { PreviewModal } from "./PreviewModal/PreviewModal";

export const PreviewButton = () => {
	const fields = useFormDraftFields();
	const { isOpen, modalActions } = useModal(ModalIds.PREVIEW);

	return (
		<>
			<IconButton
				disabled={!fields?.length}
				tooltip="Preview"
				onClick={modalActions.open}
			>
				<IconEye />
			</IconButton>

			<PreviewModal opened={isOpen} onClose={modalActions.close} />
		</>
	);
};
