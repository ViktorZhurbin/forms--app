import { QuestionEdit } from "@/shared/components/QuestionEdit/QuestionEdit";
import { AddBlockButton } from "../components/AddBlockButton/AddBlockButton";
import { useCurrentQuestion } from "../hooks/useCurrentQuestion";
import styles from "./Main.module.css";

export const Main = () => {
	const { question, order, isLast } = useCurrentQuestion();

	if (!question || order === null) return null;

	return (
		<div className={styles.root}>
			<AddBlockButton insertBefore tooltip="Add block above" />
			<div className={styles.questionWrapper}>
				<QuestionEdit question={question} order={order} isLast={isLast} />
			</div>
			<AddBlockButton tooltip="Add block below" />
		</div>
	);
};
