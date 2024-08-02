import { Stack, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import styles from "./FieldBase.module.css";

interface FieldBaseProps {
	order: number;
	title: React.ReactNode;
	field: React.ReactNode;
	buttonSubmit: React.ReactNode;
}

export const FieldBase = ({
	order,
	title,
	field,
	buttonSubmit,
}: FieldBaseProps) => {
	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<div className={styles.titleWrapper}>
					<div className={styles.order}>
						<Text>{order}</Text> <IconArrowRight />
					</div>

					{title}
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