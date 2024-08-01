import { Progress } from "@mantine/core";
import { useCallback, useState } from "react";
import { useFormGestures } from "~/hooks/useFormGestures";
import type { TField } from "~/models/field/schema";
import type { TResponse } from "~/models/response/schema";
import { FormFields } from "../FormFields/FormFields";
import { FormNavButtons } from "../FormNavButtons/FormNavButtons";
import styles from "./FormView.module.css";

type FormViewProps = {
	fields: TField[];
	response?: TResponse;
	isPreview?: boolean;
	exitButton?: React.ReactElement;
};

export const FormView = ({ fields, response, exitButton }: FormViewProps) => {
	const [currentStep, setCurrentStep] = useState(0);

	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === fields.length - 1;

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

	return (
		<div {...bind()} className={styles.container}>
			<Progress
				size="sm"
				radius={0}
				aria-label="Form completion in percentage"
				className={styles.progress}
				value={Math.round((100 / fields.length) * (currentStep + 1))}
				transitionDuration={300}
			/>

			{exitButton && <div className={styles.exitButton}>{exitButton}</div>}

			<FormFields
				currentStep={currentStep}
				fields={fields}
				answers={response?.answers}
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
