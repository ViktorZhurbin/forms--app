import { Question } from "@/shared/components/question/Question";
import { AddBlockButton } from "../components/AddBlockButton/AddBlockButton";
import { useCurrentQuestion } from "../hooks/useCurrentQuestion";
import styles from "./Main.module.css";

export const Main = () => {
	const { question, order } = useCurrentQuestion();

	if (!question || order === null) return null;

	return (
		<div className={styles.root}>
			<AddBlockButton insertBefore tooltip="Add block above" />
			<div className={styles.questionWrapper}>
				<Question editMode question={question} order={order} />
			</div>
			<AddBlockButton tooltip="Add block below" />
		</div>
	);
};
