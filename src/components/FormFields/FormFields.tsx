import { FocusTrap } from "@mantine/core";
import type { TQuestion } from "~/models/forms/schema/questions";
import { Question } from "../Question/Question";
import styles from "./FormFields.module.css";
import { getPositionDataAttribute } from "./helpers/getPositionDataAttribute";

export const FormFields = (props: {
	step: number;
	questions: TQuestion[];
	onSubmit: () => void;
	goToNextStep: () => void;
}) => {
	const { step, questions, onSubmit, goToNextStep } = props;

	return (
		<>
			{questions.map((question, index) => {
				const isLast = index === questions.length - 1;

				return (
					<FocusTrap key={question.id} active={!isLast && step === index}>
						<FocusTrap.InitialFocus />
						<div
							key={question.id}
							className={styles.root}
							data-position={getPositionDataAttribute(index, step)}
						>
							<Question
								isLast={isLast}
								question={question}
								onSubmitForm={onSubmit}
								goToNextStep={goToNextStep}
							/>
						</div>
					</FocusTrap>
				);
			})}
		</>
	);
};
