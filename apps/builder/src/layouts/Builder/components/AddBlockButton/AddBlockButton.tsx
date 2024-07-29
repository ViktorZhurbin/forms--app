import type { QuestionTypes } from "@/shared/constants/questions";
import { useCreateQuestion } from "@/shared/models/form/write/hooks/useCreateQuestion";
import { ActionIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useCallback } from "react";
import { AddBlockModal } from "../../modals/AddBlockModal/AddBlockModal";
import { navigateToQuestion } from "../../utils/navigateToQuestion";

export const AddBlockButton = ({
	tooltip,
	insertBefore,
}: { tooltip: string; insertBefore?: boolean }) => {
	const [isModalOpen, modalActions] = useDisclosure(false);
	const { createQuestion } = useCreateQuestion();

	const handleAddBlock = useCallback(
		async (type: QuestionTypes) => {
			const { nanoId } = await createQuestion({
				type,
				insertBefore,
			});

			navigateToQuestion({ nanoId });
			modalActions.close();
		},
		[insertBefore, modalActions.close, createQuestion],
	);

	return (
		<>
			<Tooltip withArrow label={tooltip}>
				<ActionIcon variant="default" onClick={modalActions.open}>
					<IconPlus />
				</ActionIcon>
			</Tooltip>

			<AddBlockModal
				onClose={modalActions.close}
				isOpen={isModalOpen}
				onAddBlock={handleAddBlock}
			/>
		</>
	);
};
