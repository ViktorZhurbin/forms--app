import type { FieldTypes } from "@/shared/constants/field";
import {
	FieldTypesMap,
	getGroupInfoByFieldType,
} from "@/shared/constants/fieldMaps";
import { Group, Text } from "@mantine/core";
import styles from "./FieldTag.module.css";

type FieldTagProps = {
	text?: string | number;
	type: FieldTypes;
};

export const FieldTag = ({ text, type }: FieldTagProps) => {
	const { Icon } = FieldTypesMap[type];
	const { bgColor } = getGroupInfoByFieldType(type);

	return (
		<Group style={{ "--bg-color": bgColor }} className={styles.root}>
			<Icon /> {text && <Text size="xs">{text}</Text>}
		</Group>
	);
};
