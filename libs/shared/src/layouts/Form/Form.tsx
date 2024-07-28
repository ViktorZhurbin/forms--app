import { Progress } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { useRef, useState } from "react";
import { FetchState } from "~/components/FetchState/FetchState";
import { useCurrentFormQuery } from "~/models/forms/read";
import { FormNotFound } from "../FormNotFound/FormNotFound";
import styles from "./Form.module.css";
import { FormNavButtons } from "./FormNavButtons/FormNavButtons";
import { FormQuestion } from "./FormQuestion/FormQuestion";

type FormProps = {
	isPreview?: boolean;
	exitButton?: React.ReactElement;
};

export const Form = ({ isPreview, exitButton }: FormProps) => {
	const [currentStep, setCurrentStep] = useState(0);
	const { isLoading, error, data } = useCurrentFormQuery();
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const reducedMotion = useReducedMotion();

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

	const scrollToStep = (step: number) => {
		const container = scrollContainerRef.current;

		// container may still be rendering
		// setTimeout to wait for when it's ready to scroll
		setTimeout(() => {
			const target = container?.querySelector(`[data-step='${step}']`);

			target?.scrollIntoView({
				block: "center",
				behavior: reducedMotion ? "instant" : "smooth",
			});
		});
	};

	const goToPreviousStep = () => {
		scrollToStep(currentStep - 1);
	};

	const goToNextStep = () => {
		scrollToStep(currentStep + 1);
	};

	const handleSubmit = () => {
		console.log("submit");
	};

	return (
		<div className={styles.container} ref={scrollContainerRef}>
			<Progress
				size="sm"
				radius={0}
				className={styles.progress}
				value={(100 / questions.length) * (currentStep + 1)}
				transitionDuration={300}
			/>

			{exitButton && <div className={styles.exitButton}>{exitButton}</div>}

			{questions.flatMap((question, index) => {
				const isHidden = Math.abs(index - currentStep) > 1;

				if (isHidden) return [];

				return (
					<FormQuestion
						key={question.id}
						index={index}
						isLast={index === questions.length - 1}
						containerRef={scrollContainerRef}
						question={question}
						onSubmit={handleSubmit}
						goToNextStep={goToNextStep}
						setCurrentStep={setCurrentStep}
					/>
				);
			})}

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
