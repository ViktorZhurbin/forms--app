import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { HeaderIconButton } from "../../components/HeaderIconButton/HeaderIconButton";
import { PreviewModal } from "../../modals/PreviewModal/PreviewModal";

export const PreviewButton = () => {
	const [isModalOpen, modalActions] = useDisclosure(false);

	return (
		<>
			<HeaderIconButton
				tooltip="Preview"
				icon={<IconEye />}
				onClick={modalActions.open}
			/>

			<PreviewModal isOpen={isModalOpen} onClose={modalActions.close} />
		</>
	);
};
