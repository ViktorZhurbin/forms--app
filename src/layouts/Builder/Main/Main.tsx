import { Question } from "~/components/Question/Question";
import { useFormQuestion } from "~/hooks/queries/useFormQuestions";
import { AddBlockButton } from "../components/AddBlockButton/AddBlockButton";
import { useFormId } from "../hooks/useFormId";
import { useSelectedBlockId } from "../hooks/useSelectedBlockId";
import styles from "./Main.module.css";

export const Main = () => {
	const formId = useFormId();
	const questionId = useSelectedBlockId();
	const question = useFormQuestion({ formId, questionId });

	if (!question) return null;

	return (
		<div className={styles.root}>
			<AddBlockButton tooltip="Add block above" />
			<div className={styles.questionWrapper}>
				<Question question={question} />
			</div>
			<AddBlockButton tooltip="Add block below" />
		</div>
	);
};
