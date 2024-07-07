import { Title } from "@mantine/core";
import type { CSSProperties } from "react";
import { QuestionGroupsMap } from "~/constants/questionMaps";
import type { QuestionTypes } from "~/constants/questions";
import { AddBlockModalQuestionItem } from "../AddBlockModalQuestionItem/AddBlockModalQuestionItem";
import styles from "./AddBlockModalContent.module.css";

type AddBlockModalContentProps = {
	onAddBlock: (type: QuestionTypes) => void;
};

export const AddBlockModalContent = ({
	onAddBlock,
}: AddBlockModalContentProps) => {
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
								<AddBlockModalQuestionItem
									key={item.type}
									item={item}
									onAddBlock={onAddBlock}
								/>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};
