import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useParams } from "wouter";
import { navigate } from "wouter/use-browser-location";
import { FormFields } from "../../components/FormFields/FormFields";
import { NavButtons } from "../../components/NavButtons/NavButtons";
import { SearchParams } from "../../constants/location";
import { formFields } from "../../mocks/formQuestions";
import styles from "./FormPreview.module.css";

export const FormPreview = () => {
	const params = useParams();

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
		const formId = params.id;

		if (formId) {
			const blockId = history.state?.blockId;
			const search = blockId ? `?${SearchParams.BLOCK_ID}=${blockId}` : "";

			navigate(`/forms/${formId}/create${search}`);
		} else {
			navigate("/");
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
				color="dark.7"
				leftSection={<IconX />}
				className={styles.exitButton}
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
