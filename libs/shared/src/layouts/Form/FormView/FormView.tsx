import { Progress } from "@mantine/core";
import { useCallback, useState } from "react";
import { useFormGestures } from "~/hooks/useFormGestures";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useLocalResponseWithFormId } from "~/hooks/useLocalResponseWithFormId";
import type { TField } from "~/models/field/schema";
import type { TAnswer, TResponse } from "~/models/response/schema";
import { createResponse, updateResponse } from "~/models/response/write";
import { FormNavButtons } from "../FormNavButtons/FormNavButtons";
import { FormQuestions } from "../FormQuestions/FormQuestions";
import styles from "./FormView.module.css";

type FormViewProps = {
	questions: TField[];
	response?: TResponse;
	isPreview?: boolean;
	exitButton?: React.ReactElement;
};

export const FormView = ({
	questions,
	response,
	exitButton,
}: FormViewProps) => {
	const [{ responseId }, setLocalResponseWithFormId] =
		useLocalResponseWithFormId();

	console.log({ responseId, response });

	const formNanoId = useFormNanoId();

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

	const handleSubmit = useCallback(
		async (answer: TAnswer) => {
			const answers = [...(response?.answers ?? []), answer];

			if (!responseId) {
				const responseId = await createResponse({ formNanoId, answers });
				setLocalResponseWithFormId({ formNanoId, responseId });
				goToNextStep();

				return;
			}

			if (isLastStep) {
				await updateResponse({
					id: responseId,
					payload: { answers, submittedAt: new Date().toISOString() },
				});

				return;
			}

			await updateResponse({
				id: responseId,
				payload: { answers },
			});
		},
		[
			responseId,
			formNanoId,
			setLocalResponseWithFormId,
			goToNextStep,
			isLastStep,
			response?.answers,
		],
	);

	return (
		<div {...bind()} className={styles.container}>
			<Progress
				size="sm"
				radius={0}
				aria-label="Form completion in percentage"
				className={styles.progress}
				value={Math.round((100 / questions.length) * (currentStep + 1))}
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
