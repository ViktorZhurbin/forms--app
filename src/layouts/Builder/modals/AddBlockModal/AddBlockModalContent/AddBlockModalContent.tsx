import { Title } from "@mantine/core";
import type { CSSProperties } from "react";
import { QuestionGroupsMap } from "~/constants/questionMaps";
import { useFormId } from "~/layouts/Builder/hooks/useFormId";
import { AddBlockModalQuestionItem } from "../AddBlockModalQuestionItem/AddBlockModalQuestionItem";
import styles from "./AddBlockModalContent.module.css";

type AddBlockModalContentProps = {
	insertBefore?: boolean;
	onClose: () => void;
};

export const AddBlockModalContent = ({
	onClose,
	insertBefore,
}: AddBlockModalContentProps) => {
	const formId = useFormId();

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
									formId={formId}
									onClose={onClose}
									insertBefore={insertBefore}
								/>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};
