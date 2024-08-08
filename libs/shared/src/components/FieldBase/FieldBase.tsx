import { Stack, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import clsx from "clsx";
import styles from "./FieldBase.module.css";

interface FieldBaseProps {
	order: number;
	title: React.ReactNode;
	description?: React.ReactNode;
	field: React.ReactNode;
	buttonSubmit: React.ReactNode;
	classNames?: {
		root?: string;
		order?: string;
	};
}

export const FieldBase = ({
	order,
	title,
	description,
	field,
	classNames,
	buttonSubmit,
}: FieldBaseProps) => {
	return (
		<div className={clsx(styles.root, classNames?.root)}>
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
					<Stack gap={8} w="100%">
						{field}
					</Stack>

					{buttonSubmit}
				</div>
			</div>
		</div>
	);
};
