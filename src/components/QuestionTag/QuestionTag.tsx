import { Group, Text } from "@mantine/core";
import { IconBan } from "@tabler/icons-react";
import type { QuestionGroups } from "~/constants/questions";
import { clx } from "~/utils/classNames";
import styles from "./QuestionTag.module.css";

type QuestionTagProps = {
	text?: string | number;
	group: QuestionGroups;
};

export const QuestionTag = ({ text, group }: QuestionTagProps) => {
	return (
		<Group className={clx(styles.root, styles[group])}>
			<IconBan /> {text && <Text size="xs">{text}</Text>}
		</Group>
	);
};
