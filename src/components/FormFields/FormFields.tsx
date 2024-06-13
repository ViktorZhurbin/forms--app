import { type QuestionType, QuestionTypes } from "../../constants/questions";
import { MultipleChoice } from "../MultipleChoice/MultipleChoice";
import styles from "./FormFields.module.css";
import { getPositionDataAttribute } from "./helpers/getPositionDataAttribute";

export const FormFields = (props: {
	formFields: QuestionType[];
	step: number;
	onSubmit: () => void;
	goToNextStep: () => void;
}) => {
	const { formFields, step, onSubmit, goToNextStep } = props;

	const getComponentByQuestionType = (
		question: QuestionType,
		index: number,
	) => {
		switch (question.type) {
			case QuestionTypes.YesNo:
			case QuestionTypes.MultipleChoice:
				return (
					<MultipleChoice
						question={question}
						isLast={index === formFields.length - 1}
						onSubmitForm={onSubmit}
						goToNextStep={goToNextStep}
					/>
				);

			// case QuestionType.ShortText:

			default:
				return false;
		}
	};

	return (
		<>
			{formFields.map((field, index) => {
				return (
					<div
						key={field.id}
						className={styles.root}
						data-position={getPositionDataAttribute(index, step)}
					>
						{getComponentByQuestionType(field, index)}
					</div>
				);
			})}
		</>
	);
};
