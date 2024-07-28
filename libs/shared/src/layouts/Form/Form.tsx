import { Progress } from "@mantine/core";
import { useState } from "react";
import { FetchState } from "~/components/FetchState/FetchState";
import { useFormGestures } from "~/hooks/useFormGestures";
import { useCurrentFormQuery } from "~/models/forms/read";
import { FormNotFound } from "../FormNotFound/FormNotFound";
import styles from "./Form.module.css";
import { FormNavButtons } from "./FormNavButtons/FormNavButtons";
import { FormQuestions } from "./FormQuestions/FormQuestions";

type FormProps = {
	isPreview?: boolean;
	exitButton?: React.ReactElement;
};

export const Form = ({ isPreview, exitButton }: FormProps) => {
	const [currentStep, setCurrentStep] = useState(0);
	const { isLoading, error, data } = useCurrentFormQuery();

	const goToPreviousStep = () => {
		if (currentStep === 0) return;

		setCurrentStep(currentStep - 1);
	};

	const goToNextStep = () => {
		if (currentStep === questions.length - 1) return;

		setCurrentStep(currentStep + 1);
	};

	const bind = useFormGestures({
		goToNextStep,
		goToPreviousStep,
	});

	if (error || isLoading) {
		return <FetchState isLoading={isLoading} error={error} />;
	}

	const form = data.forms?.[0];

	if (!form) {
		return <FormNotFound />;
	}

	const questions = isPreview ? form.draftQuestions : form.questions;

	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === questions.length - 1;

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
