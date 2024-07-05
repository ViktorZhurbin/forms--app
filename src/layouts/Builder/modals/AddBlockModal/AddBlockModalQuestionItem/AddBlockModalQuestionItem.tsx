import { Button, Text } from "@mantine/core";
import { QuestionTag } from "~/components/QuestionTag/QuestionTag";
import type { QuestionTypesMapItem } from "~/constants/questionMaps";
import { navigateToQuestion } from "~/layouts/Builder/utils/navigateToQuestion";
import { useCreateQuestion } from "~/models/forms/write/hooks/useCreateQuestion";
import styles from "./AddBlockModalQuestionItem.module.css";

interface AddBlockModalQuestionItemProps {
	insertBefore?: boolean;
	item: QuestionTypesMapItem;
	onClose: () => void;
}

export const AddBlockModalQuestionItem = ({
	item,
	onClose,
	insertBefore,
}: AddBlockModalQuestionItemProps) => {
	const { createQuestion } = useCreateQuestion();

	const handleClick = async () => {
		const questionId = await createQuestion({
			insertBefore,
			type: item.type,
		});

		navigateToQuestion(questionId);
		onClose();
	};

	const classNames = {
		root: styles.buttonRoot,
		label: styles.buttonLabel,
	};

	return (
		<Button
			key={item.type}
			variant="subtle"
			justify="start"
			classNames={classNames}
			onClick={handleClick}
		>
			<QuestionTag type={item.type} group={item.group} />
			<Text size="sm">{item.name}</Text>
		</Button>
	);
};
