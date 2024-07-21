import { useCurrentForm } from "@/shared/models/forms/read";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { HeaderIconButton } from "../../components/HeaderIconButton/HeaderIconButton";
import { PreviewModal } from "../../modals/PreviewModal/PreviewModal";

export const PreviewButton = () => {
	const form = useCurrentForm();

	const [isModalOpen, modalActions] = useDisclosure(false);

	return (
		<>
			<HeaderIconButton
				disabled={!form?.draftQuestions.length}
				tooltip="Preview"
				icon={<IconEye />}
				onClick={modalActions.open}
			/>

			<PreviewModal isOpen={isModalOpen} onClose={modalActions.close} />
		</>
	);
};
