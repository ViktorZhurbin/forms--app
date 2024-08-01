import { Stack, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import styles from "./QuestionBase.module.css";

interface QuestionBaseProps {
	order: number;
	title: React.ReactElement;
	question: React.ReactElement;
	buttonSubmit: React.ReactElement;
}

export const QuestionBase = ({
	order,
	title,
	question,
	buttonSubmit,
}: QuestionBaseProps) => {
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
						{question}
					</Stack>

					{buttonSubmit}
				</div>
			</div>
		</div>
	);
};
