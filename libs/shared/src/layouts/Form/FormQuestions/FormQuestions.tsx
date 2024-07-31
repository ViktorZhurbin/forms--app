import { QuestionView } from "~/components/QuestionView/QuestionView";
import type { TField } from "~/models/field/schema";
import type { TAnswer } from "~/models/response/schema";
import styles from "./FormQuestions.module.css";
import { getPosition } from "./getPosition";

export type FormQuestionsProps = {
	currentStep: number;
	questions: TField[];
	onSubmit: (answer: TAnswer) => void;
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
					onSubmit={onSubmit}
					goToNextStep={goToNextStep}
				/>
			</div>
		);
	});
};
