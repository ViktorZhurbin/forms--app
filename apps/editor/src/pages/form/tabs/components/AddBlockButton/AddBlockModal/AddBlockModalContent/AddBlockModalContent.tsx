import type { FieldTypes } from "@/shared/constants/field";
import { FieldGroupsInfo } from "@/shared/constants/fieldMaps";
import { Title } from "@mantine/core";
import type { CSSProperties } from "react";
import { AddBlockModalFieldItem } from "../AddBlockModalFieldItem/AddBlockModalFieldItem";
import styles from "./AddBlockModalContent.module.css";

type AddBlockModalContentProps = {
	onAddBlock: (type: FieldTypes) => void;
};

export const AddBlockModalContent = ({
	onAddBlock,
}: AddBlockModalContentProps) => {
	const groupsInfoValues = Object.values(FieldGroupsInfo);
	const wrapperStyles = {
		"--groups-count": groupsInfoValues.length,
	} as CSSProperties;

	return (
		<div style={wrapperStyles} className={styles.wrapper}>
			{groupsInfoValues.map(({ name, types }) => {
				return (
					<div key={name} className={styles.group}>
						<Title order={6} fw={500} className={styles.groupTitle}>
							{name}
						</Title>
						<div className={styles.typesList}>
							{types.map((type) => (
								<AddBlockModalFieldItem
									key={type}
									type={type}
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
