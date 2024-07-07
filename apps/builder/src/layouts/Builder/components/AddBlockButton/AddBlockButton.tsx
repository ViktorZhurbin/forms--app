import { ActionIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useCallback } from "react";
import type { QuestionTypes } from "~/constants/questions";
import { useCreateQuestion } from "~/models/forms/write/hooks/useCreateQuestion";
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
			const questionId = await createQuestion({
				type,
				insertBefore,
			});

			navigateToQuestion(questionId);
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