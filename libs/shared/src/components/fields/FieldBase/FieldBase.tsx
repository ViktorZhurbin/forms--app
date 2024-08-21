import { Stack, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import clsx from "clsx";
import { type FieldTypes, isNonQuestionField } from "~/constants/field";
import styles from "./FieldBase.module.css";

interface FieldBaseProps {
	order: number | null;
	title: React.ReactNode;
	description?: React.ReactNode;
	field: React.ReactNode;
	buttonSubmit: React.ReactNode;
	fieldType: FieldTypes;
	classNames?: {
		root?: string;
		order?: string;
	};
}

export const FieldBase = ({
	order: orderProp,
	title,
	description,
	field,
	fieldType,
	classNames,
	buttonSubmit,
}: FieldBaseProps) => {
	const isNonQuestion = isNonQuestionField(fieldType);
	const order = isNonQuestion ? null : orderProp;

	return (
		<div
			className={clsx(styles.root, classNames?.root, {
				[styles.centered]: isNonQuestion,
			})}
		>
			<div className={styles.wrapper}>
				<div className={styles.headerGroup}>
					<div className={styles.titleWrapper}>
						{order && (
							<div className={clsx(styles.order, classNames?.order)}>
								<Text>{order}</Text> <IconArrowRight />
							</div>
						)}
						{title}
					</div>
					{description}
				</div>
				<div className={styles.bottomWrapper}>
					{field && (
						<Stack gap={8} w="100%">
							{field}
						</Stack>
					)}

					{buttonSubmit}
				</div>
			</div>
		</div>
	);
};
