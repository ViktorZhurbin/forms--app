import { QuestionTypesMap } from "@/shared/constants/fieldMaps";
import type { FieldTypes } from "@/shared/constants/fields";
import { Button, Text } from "@mantine/core";
import { QuestionTag } from "~/components/QuestionTag/QuestionTag";
import styles from "./AddBlockModalQuestionItem.module.css";

interface AddBlockModalQuestionItemProps {
	type: FieldTypes;
	onAddBlock: (type: FieldTypes) => void;
}

export const AddBlockModalQuestionItem = ({
	type,
	onAddBlock,
}: AddBlockModalQuestionItemProps) => {
	const handleClick = () => {
		onAddBlock(type);
	};

	const classNames = {
		root: styles.buttonRoot,
		label: styles.buttonLabel,
	};

	const { name } = QuestionTypesMap[type];

	return (
		<Button
			key={type}
			variant="subtle"
			justify="start"
			classNames={classNames}
			onClick={handleClick}
		>
			<QuestionTag type={type} />
			<Text size="sm">{name}</Text>
		</Button>
	);
};
