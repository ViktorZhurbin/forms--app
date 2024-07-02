import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { PreviewModal } from "../../modals/PreviewModal/PreviewModal";

export const PreviewButton = () => {
	const [isModalOpen, modalActions] = useDisclosure(false);

	return (
		<>
			<Button
				variant="default"
				color="dark.7"
				leftSection={<IconEye />}
				onClick={modalActions.open}
			>
				Preview
			</Button>

			<PreviewModal isOpen={isModalOpen} onClose={modalActions.close} />
		</>
	);
};
