import { Stack, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import type { TField } from "~/models/field/schema";
import styles from "./QuestionBase.module.css";

interface QuestionBaseProps {
	question: TField;
	order: number;
	isLast: boolean;
	Title: React.FC<{ title: string }>;
	Question: React.FC;
	ButtonSubmit: React.FC<{ className: string; text: string }>;
}

export const QuestionBase = ({
	order,
	isLast,
	Title,
	question,
	Question,
	ButtonSubmit,
}: QuestionBaseProps) => {
	const buttonTextFallback = isLast ? "Submit" : "OK";

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<div className={styles.titleWrapper}>
					<div className={styles.order}>
						<Text>{order}</Text> <IconArrowRight />
					</div>

					<Title title={question?.title || "..."} />
				</div>
				<div className={styles.bottomWrapper}>
					<Stack gap={8} w="100%">
						<Question />
					</Stack>

					<ButtonSubmit
						className={styles.submitButton}
						text={question.buttonText || buttonTextFallback}
					/>
				</div>
			</div>
		</div>
	);
};
