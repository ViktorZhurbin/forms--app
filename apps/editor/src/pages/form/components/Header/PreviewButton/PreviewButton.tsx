import { IconButton } from "@/shared/components/IconButton/IconButton";
import { SearchParams } from "@/shared/constants/location";
import { ModalIds } from "@/shared/constants/modals";
import { useIsPreview } from "@/shared/hooks/searchParams/useIsPreview";
import { useFormDraftFields } from "@/shared/models/field/read";
import { IconEye } from "@tabler/icons-react";
import { navigateWithSearch } from "~/utils/searchParams";
import { PreviewModal } from "./PreviewModal/PreviewModal";

export const PreviewButton = () => {
	const fields = useFormDraftFields();
	const isModalOpen = useIsPreview();

	const handleModalOpen = () => {
		navigateWithSearch({ [SearchParams.MODAL]: ModalIds.PREVIEW });
	};

	const handleModalClose = () => {
		navigateWithSearch({ [SearchParams.MODAL]: null });
	};

	return (
		<>
			<IconButton
				disabled={!fields?.length}
				tooltip="Preview"
				onClick={handleModalOpen}
			>
				<IconEye />
			</IconButton>

			<PreviewModal opened={isModalOpen} onClose={handleModalClose} />
		</>
	);
};
