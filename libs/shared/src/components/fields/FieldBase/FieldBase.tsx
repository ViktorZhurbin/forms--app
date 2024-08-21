import { Stack, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import clsx from "clsx";
import type { TField } from "~/models/field/schema";
import { isFieldRequired, isQestionField } from "~/utils/fieldPredicates";
import styles from "./FieldBase.module.css";

interface FieldBaseProps {
	order: number | null;
	title: React.ReactNode;
	description?: React.ReactNode;
	fieldComponent: React.ReactNode;
	buttonSubmit: React.ReactNode;
	field: TField;
	classNames?: {
		root?: string;
		order?: string;
	};
}

export const FieldBase = ({
	order: orderProp,
	title,
	description,
	fieldComponent,
	field,
	classNames,
	buttonSubmit,
}: FieldBaseProps) => {
	const isQuestion = isQestionField(field);
	const order = isQuestion ? orderProp : null;

	const isRequired = isFieldRequired(field);

	return (
		<div
			className={clsx(styles.root, classNames?.root, {
				[styles.centered]: !isQuestion,
			})}
		>
			<div className={styles.wrapper}>
				<div className={styles.headerGroup}>
					<div
						className={clsx(styles.titleWrapper, {
							[styles.isRequired]: isRequired,
						})}
					>
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
					{fieldComponent && (
						<Stack gap={8} w="100%">
							{fieldComponent}
						</Stack>
					)}

					{buttonSubmit}
				</div>
			</div>
		</div>
	);
};
