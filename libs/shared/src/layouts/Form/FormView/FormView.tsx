import { Progress } from "@mantine/core";
import { useCallback, useState } from "react";
import { useFormGestures } from "~/hooks/useFormGestures";
import type { TQuestion } from "~/models/field/schema";
import { FormNavButtons } from "../FormNavButtons/FormNavButtons";
import { FormQuestions } from "../FormQuestions/FormQuestions";
import styles from "./FormView.module.css";

type FormViewProps = {
	questions: TQuestion[];
	exitButton?: React.ReactElement;
};

export const FormView = ({ questions, exitButton }: FormViewProps) => {
	const [currentStep, setCurrentStep] = useState(0);

	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === questions.length - 1;

	const goToPreviousStep = useCallback(() => {
		if (isFirstStep) return;

		setCurrentStep(currentStep - 1);
	}, [currentStep, isFirstStep]);

	const goToNextStep = useCallback(() => {
		if (isLastStep) return;

		setCurrentStep(currentStep + 1);
	}, [currentStep, isLastStep]);

	const bind = useFormGestures({
		goToNextStep,
		goToPreviousStep,
	});

	const handleSubmit = () => {
		console.log("submit");
	};

	return (
		<div {...bind()} className={styles.container}>
			<Progress
				size="sm"
				radius={0}
				className={styles.progress}
				value={(100 / questions.length) * (currentStep + 1)}
				transitionDuration={300}
			/>

			{exitButton && <div className={styles.exitButton}>{exitButton}</div>}

			<FormQuestions
				currentStep={currentStep}
				questions={questions}
				onSubmit={handleSubmit}
				goToNextStep={goToNextStep}
			/>

			<FormNavButtons
				className={styles.navigation}
				isPrevDisabled={isFirstStep}
				isNextDisabled={isLastStep}
				onClickPrev={goToPreviousStep}
				onClickNext={goToNextStep}
			/>
		</div>
	);
};
