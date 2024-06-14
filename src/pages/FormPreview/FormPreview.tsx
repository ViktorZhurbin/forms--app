import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { FormFields } from "../../components/FormFields/FormFields";
import { NavButtons } from "../../components/NavButtons/NavButtons";
import { formFields } from "../../mocks/formQuestions";
import styles from "./FormPreview.module.css";

export const FormPreview = () => {
	const params = useParams();
	const [_, setLocation] = useLocation();

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

	const handleExist = () => {
		if (history.length > 1) {
			history.go(-1);

			return;
		}

		const formId = params.id;

		if (formId) {
			setLocation(`/forms/${formId}/create`);
		} else {
			setLocation("/");
		}
	};

	return (
		<div className={styles.root}>
			<FormFields
				step={step}
				questions={formFields}
				onSubmit={handleSubmit}
				goToNextStep={goToNextStep}
			/>

			<Button
				color="rgb(31, 41, 55)"
				leftSection={<IconX />}
				style={{ alignSelf: "end", margin: "12px 16px" }}
				onClick={handleExist}
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
