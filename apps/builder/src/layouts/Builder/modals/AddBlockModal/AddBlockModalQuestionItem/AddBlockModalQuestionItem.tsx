import type { QuestionTypesMapItem } from "@/shared/constants/fieldMaps";
import type { FieldTypes } from "@/shared/constants/fields";
import { Button, Text } from "@mantine/core";
import { QuestionTag } from "~/components/QuestionTag/QuestionTag";
import styles from "./AddBlockModalQuestionItem.module.css";

interface AddBlockModalQuestionItemProps {
	item: QuestionTypesMapItem;
	onAddBlock: (type: FieldTypes) => void;
}

export const AddBlockModalQuestionItem = ({
	item,
	onAddBlock,
}: AddBlockModalQuestionItemProps) => {
	const handleClick = () => {
		onAddBlock(item.type);
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
