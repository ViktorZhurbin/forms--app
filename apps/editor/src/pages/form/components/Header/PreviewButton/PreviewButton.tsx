import { useFormFields } from "@/shared/models/field/read";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { PreviewModal } from "~/pages/form/modals/PreviewModal/PreviewModal";
import { HeaderIconButton } from "../HeaderIconButton/HeaderIconButton";

export const PreviewButton = () => {
	const fields = useFormFields();

	const [isModalOpen, modalActions] = useDisclosure(false);

	return (
		<>
			<HeaderIconButton
				disabled={!fields?.length}
				tooltip="Preview"
				icon={<IconEye />}
				onClick={modalActions.open}
			/>

			<PreviewModal isOpen={isModalOpen} onClose={modalActions.close} />
		</>
	);
};
