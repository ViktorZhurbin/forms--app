import { useState } from "react";

import { FormFields } from "../../components/FormFields/FormFields";
import { NavButtons } from "../../components/NavButtons/NavButtons";
import { formFields } from "../../mocks/formQuestions";
import styles from "./Form.module.css";

export const Form = () => {
	const [step, setStep] = useState(0);

	const isFirstStep = step === 0;
	const isLastStep = step === formFields.length - 1;

	const goToPreviousStep = () => {
		if (isFirstStep) return;

		setStep((step) => step - 1);
	};

	const goToNextStep = () => {
		if (isLastStep) return;

		setStep((step) => step + 1);
	};

	const handleSubmit = () => {
		console.log("submit");
	};

	return (
		<div className={styles.root}>
			<FormFields
				step={step}
				formFields={formFields}
				onSubmit={handleSubmit}
				goToNextStep={goToNextStep}
			/>

			<NavButtons
				className={styles.navigation}
				isPrevDisabled={isFirstStep}
				isNextDisabled={isLastStep}
				onClickPrev={goToPreviousStep}
				onClickNext={goToNextStep}
			/>
		</div>
	);
};
