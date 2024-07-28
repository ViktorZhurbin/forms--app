import { QuestionView } from "~/components/QuestionView/QuestionView";
import type { TQuestion } from "~/models/forms/schema/questions";
import styles from "./FormQuestion.module.css";

export type FormQuestionProps = {
	index: number;
	isLast: boolean;
	position?: string;
	question: TQuestion;
	onSubmit: () => void;
	goToNextStep: () => void;
};

export const FormQuestion = ({
	index,
	position,
	isLast,
	question,
	onSubmit,
	goToNextStep,
}: FormQuestionProps) => {
	return (
		<div className={styles.root} data-position={position}>
			<QuestionView
				order={index + 1}
				isLast={isLast}
				question={question}
				onSubmitForm={onSubmit}
				goToNextStep={goToNextStep}
			/>
		</div>
	);
};
