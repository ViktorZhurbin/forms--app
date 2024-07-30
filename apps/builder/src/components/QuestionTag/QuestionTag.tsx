import type { FieldTypes } from "@/shared/constants/field";
import {
	QuestionTypesMap,
	getGroupInfoByFieldType,
} from "@/shared/constants/fieldMaps";
import { Group, Text } from "@mantine/core";
import styles from "./QuestionTag.module.css";

type QuestionTagProps = {
	text?: string | number;
	type: FieldTypes;
};

export const QuestionTag = ({ text, type }: QuestionTagProps) => {
	const { Icon } = QuestionTypesMap[type];
	const { bgColor } = getGroupInfoByFieldType(type);

	return (
		<Group style={{ "--bg-color": bgColor }} className={styles.root}>
			<Icon /> {text && <Text size="xs">{text}</Text>}
		</Group>
	);
};
