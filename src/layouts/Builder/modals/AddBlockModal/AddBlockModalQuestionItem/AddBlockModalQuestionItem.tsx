import { Button, Text } from "@mantine/core";
import { QuestionTag } from "~/components/QuestionTag/QuestionTag";
import type { QuestionTypesMapItem } from "~/constants/questionMaps";
import { navigateToQuestion } from "~/layouts/Builder/utils/navigateToQuestion";
import { useCreateQuestion } from "~/models/questions/write/useCreateQuestion";
import styles from "./AddBlockModalQuestionItem.module.css";

interface AddBlockModalQuestionItemProps {
	formId: string;
	insertBefore?: boolean;
	item: QuestionTypesMapItem;
	onClose: () => void;
}

export const AddBlockModalQuestionItem = ({
	item,
	formId,
	onClose,
	insertBefore,
}: AddBlockModalQuestionItemProps) => {
	const { createQuestion, questionId } = useCreateQuestion({
		formId,
		insertBefore,
		type: item.type,
	});

	const handleClick = async () => {
		await createQuestion();

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
