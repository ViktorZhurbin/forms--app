import type { QuestionType } from "../../constants/questions";
import { Question } from "../Question/Question";
import styles from "./FormFields.module.css";
import { getPositionDataAttribute } from "./helpers/getPositionDataAttribute";

export const FormFields = (props: {
	questions: QuestionType[];
	step: number;
	onSubmit: () => void;
	goToNextStep: () => void;
}) => {
	const { questions, step, onSubmit, goToNextStep } = props;

	return (
		<>
			{questions.map((question, index) => {
				return (
					<div
						key={question.id}
						className={styles.root}
						data-position={getPositionDataAttribute(index, step)}
					>
						<Question
							id={question.id}
							isLast={index === questions.length - 1}
							onSubmitForm={onSubmit}
							goToNextStep={goToNextStep}
						/>
					</div>
				);
			})}
		</>
	);
};
