import { Group, Text } from "@mantine/core";
import { QuestionGroupsMap, QuestionTypesMap } from "~/constants/questionMaps";
import type { QuestionGroups, QuestionTypes } from "~/constants/questions";
import styles from "./QuestionTag.module.css";

type QuestionTagProps = {
	text?: string | number;
	type: QuestionTypes;
	group: QuestionGroups;
};

export const QuestionTag = ({ text, group, type }: QuestionTagProps) => {
	const { Icon } = QuestionTypesMap[type];

	return (
		<Group
			style={{ "--bg-color": QuestionGroupsMap[group].bgColor }}
			className={styles.root}
		>
			<Icon /> {text && <Text size="xs">{text}</Text>}
		</Group>
	);
};
