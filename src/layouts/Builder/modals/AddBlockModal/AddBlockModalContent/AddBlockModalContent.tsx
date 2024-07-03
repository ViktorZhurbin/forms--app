import { Button, Text, Title } from "@mantine/core";
import type { CSSProperties } from "react";
import { QuestionTag } from "~/components/QuestionTag/QuestionTag";
import {
	QuestionGroupsMap,
	type QuestionTypesMapItem,
} from "~/constants/questionMaps";
import { useFormId } from "~/layouts/Builder/hooks/useFormId";
import { createQuestion } from "~/models/questions/write";
import styles from "./AddBlockModalContent.module.css";

interface QuestionTypeItemProps
	extends Pick<AddBlockModalContentProps, "onClose"> {
	formId: string;
	item: QuestionTypesMapItem;
}

const QuestionTypeItem = ({ formId, item, onClose }: QuestionTypeItemProps) => {
	const handleClick = async () => {
		await createQuestion({ formId, type: item.type });

		onClose();
	};

	const classnames = {
		root: styles.buttonRoot,
		label: styles.buttonLabel,
	};

	return (
		<Button
			key={item.type}
			variant="subtle"
			justify="start"
			classNames={classnames}
			onClick={handleClick}
		>
			<QuestionTag type={item.type} group={item.group} />
			<Text size="sm">{item.name}</Text>
		</Button>
	);
};

type AddBlockModalContentProps = {
	onClose: () => void;
};

export const AddBlockModalContent = ({
	onClose,
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
								<QuestionTypeItem
									key={item.type}
									item={item}
									formId={formId}
									onClose={onClose}
								/>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};
