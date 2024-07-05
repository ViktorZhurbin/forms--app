import { Modal } from "@mantine/core";
import type { QuestionTypes } from "~/constants/questions";
import type { ModalProps } from "../types";
import { AddBlockModalContent } from "./AddBlockModalContent/AddBlockModalContent";

export const AddBlockModal = ({
	isOpen,
	onClose,
	onAddBlock,
}: ModalProps & { onAddBlock: (type: QuestionTypes) => void }) => {
	return (
		<Modal title="Select block" opened={isOpen} onClose={onClose}>
			<AddBlockModalContent onAddBlock={onAddBlock} />
		</Modal>
	);
};
