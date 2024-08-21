import type { FieldTypes } from "@/shared/constants/field";
import { FieldTypesMap } from "@/shared/constants/fieldMaps";
import { Button, Text } from "@mantine/core";
import { FieldTag } from "~/components/FieldTag/FieldTag";
import styles from "./AddBlockModalFieldItem.module.css";

interface AddBlockModalFieldItemProps {
	type: FieldTypes;
	onAddBlock: (type: FieldTypes) => void;
}

export const AddBlockModalFieldItem = ({
	type,
	onAddBlock,
}: AddBlockModalFieldItemProps) => {
	const handleClick = () => {
		onAddBlock(type);
	};

	const classNames = {
		root: styles.buttonRoot,
		label: styles.buttonLabel,
	};

	const { name } = FieldTypesMap[type];

	return (
		<Button
			key={type}
			variant="subtle"
			justify="start"
			classNames={classNames}
			onClick={handleClick}
		>
			<FieldTag type={type} />
			<Text size="sm">{name}</Text>
		</Button>
	);
};
