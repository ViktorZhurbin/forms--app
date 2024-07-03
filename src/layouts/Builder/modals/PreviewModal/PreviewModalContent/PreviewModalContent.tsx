import { Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { FetchState } from "~/components/FetchState/FetchState";
import { FormFields } from "~/components/FormFields/FormFields";
import { NavButtons } from "~/components/NavButtons/NavButtons";
import { useOrderedQuestionsQuery } from "~/models/questions/read";
import { useFormId } from "../../../hooks/useFormId";
import styles from "./PreviewModalContent.module.css";

type PreviewProps = {
	onClose: () => void;
};

export const PreviewModalContent = ({ onClose }: PreviewProps) => {
	const formId = useFormId();
	const [step, setStep] = useState(0);

	const { isLoading, error, data } = useOrderedQuestionsQuery(formId);

	const isFirstStep = step === 0;
	const isLastStep =
		step === (data?.questions.length && data?.questions?.length - 1);

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
			{data ? (
				<FormFields
					step={step}
					questions={data.questions}
					onSubmit={handleSubmit}
					goToNextStep={goToNextStep}
				/>
			) : (
				<FetchState isLoading={isLoading} error={error} />
			)}

			<Button
				color="rgb(31, 41, 55)"
				leftSection={<IconX />}
				className={styles.exitButton}
				onClick={onClose}
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