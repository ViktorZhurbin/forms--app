import { Button, Text, Title } from "@mantine/core";
import type { CSSProperties } from "react";
import { QuestionTag } from "~/components/QuestionTag/QuestionTag";
import {
	QuestionGroupsMap,
	type QuestionTypesMapItem,
} from "~/constants/questionMaps";
import styles from "./AddBlockModalContent.module.css";

const QuestionTypeItem = ({ item }: { item: QuestionTypesMapItem }) => {
	return (
		<Button
			key={item.type}
			variant="subtle"
			justify="start"
			classNames={{
				root: styles.buttonRoot,
				label: styles.buttonLabel,
			}}
		>
			<QuestionTag type={item.type} group={item.group} />
			<Text size="sm">{item.name}</Text>
		</Button>
	);
};

export const AddBlockModalContent = () => {
	const groups = Object.values(QuestionGroupsMap);
	const wrapperStyles = { "--groups-count": groups.length } as CSSProperties;

	return (
		<div style={wrapperStyles} className={styles.wrapper}>
			{groups.map(({ name, group, types }) => {
				return (
					<div key={group} className={styles.group}>
						<Title order={6} className={styles.groupTitle}>
							{name}
						</Title>
						<div className={styles.typesList}>
							{types.map((item) => (
								<QuestionTypeItem key={item.type} item={item} />
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};
