import { Button } from "@mantine/core";
import { useState } from "react";

import { FormFields } from "../../components/FormFields/FormFields";
import { NavButtons } from "../../components/NavButtons/NavButtons";
import { formFields } from "../../mocks/formQuestions";

import { IconX } from "@tabler/icons-react";
import styles from "./FormPreview.module.css";

export const FormPreview = () => {
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

			<Button
				color="rgb(31, 41, 55)"
				leftSection={<IconX />}
				style={{ alignSelf: "end", margin: "12px 16px" }}
				onClick={() => {
					history.go(-1);
				}}
			>
				Exit preview
			</Button>

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
