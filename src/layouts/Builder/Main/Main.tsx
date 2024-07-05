import { Question } from "~/components/Question/Question";
import { useCurrentQuestion } from "~/models/forms/read";
import { AddBlockButton } from "../components/AddBlockButton/AddBlockButton";
import styles from "./Main.module.css";

export const Main = () => {
	const question = useCurrentQuestion();

	if (!question) return null;

	return (
		<div className={styles.root}>
			<AddBlockButton insertBefore tooltip="Add block above" />
			<div className={styles.questionWrapper}>
				<Question question={question} />
			</div>
			<AddBlockButton tooltip="Add block below" />
		</div>
	);
};
