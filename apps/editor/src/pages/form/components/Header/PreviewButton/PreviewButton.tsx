import { IconButton } from "@/shared/components/IconButton/IconButton";
import { SearchParams } from "@/shared/constants/location";
import { useFormDraftFields } from "@/shared/models/field/read";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { setSearchParams } from "~/utils/searchParams";
import { PreviewModal } from "./PreviewModal/PreviewModal";

export const PreviewButton = () => {
	const fields = useFormDraftFields();

	const [isModalOpen, modalActions] = useDisclosure(false);

	const handleModalOpen = () => {
		modalActions.open();
		setSearchParams({ [SearchParams.PREVIEW]: "true" });
	};

	const handleModalClose = () => {
		modalActions.close();
		setSearchParams({ [SearchParams.PREVIEW]: null });
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
