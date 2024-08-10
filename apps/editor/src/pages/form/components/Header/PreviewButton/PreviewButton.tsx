import { SearchParams } from "@/shared/constants/location";
import { useFormFields } from "@/shared/models/field/read";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { PreviewModal } from "~/pages/form/modals/PreviewModal/PreviewModal";
import { setSearchParams } from "~/utils/searchParams";
import { HeaderIconButton } from "../HeaderIconButton/HeaderIconButton";

export const PreviewButton = () => {
	const fields = useFormFields();

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
			<HeaderIconButton
				disabled={!fields?.length}
				tooltip="Preview"
				icon={<IconEye />}
				onClick={handleModalOpen}
			/>

			<PreviewModal isOpen={isModalOpen} onClose={handleModalClose} />
		</>
	);
};
