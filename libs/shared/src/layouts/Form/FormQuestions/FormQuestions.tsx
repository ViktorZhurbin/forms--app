import { QuestionView } from "~/components/QuestionView/QuestionView";
import type { TQuestion } from "~/models/forms/schema/questions";
import styles from "./FormQuestions.module.css";
import { getPosition } from "./getPosition";

export type FormQuestionsProps = {
	currentStep: number;
	questions: TQuestion[];
	onSubmit: () => void;
	goToNextStep: () => void;
};

export const FormQuestions = ({
	questions,
	currentStep,
	onSubmit,
	goToNextStep,
}: FormQuestionsProps) => {
	return questions.flatMap((question, index) => {
		const isHidden = Math.abs(index - currentStep) > 1;

		if (isHidden) return [];

		const position = getPosition(currentStep, index);

		return (
			<div
				key={question.id}
				className={styles.questionWrapper}
				data-position={position}
			>
				<QuestionView
					order={index + 1}
					isLast={index === questions.length - 1}
					question={question}
					onSubmitForm={onSubmit}
					goToNextStep={goToNextStep}
				/>
			</div>
		);
	});
};
