import { Progress } from "@mantine/core";
import { useRef, useState } from "react";
import { FetchState } from "~/components/FetchState/FetchState";
import { useCurrentFormQuery } from "~/models/forms/read";
import { NotFound } from "../NotFound/NotFound";
import styles from "./Form.module.css";
import { FormNavButtons } from "./FormNavButtons/FormNavButtons";
import { FormQuestions } from "./FormQuestions/FormQuestions";

type FormProps = {
	exitButton?: React.ReactElement;
};

export const Form = ({ exitButton }: FormProps) => {
	const [currentStep, setCurrentStep] = useState(0);
	const { isLoading, error, data } = useCurrentFormQuery();

	const form = data?.forms?.[0];
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === (form && form?.questions?.length - 1);

	const scrollToStep = (step: number) => {
		const container = scrollContainerRef.current;

		// container may still be rendering
		// setTimeout to wait for when it's ready to scroll
		setTimeout(() => {
			const target = container?.querySelectorAll("[data-step]")?.[step];

			target?.scrollIntoView({ block: "center", behavior: "smooth" });
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

	const formNotFound = data?.forms.length === 0;

	return formNotFound ? (
		<NotFound />
	) : (
		<div className={styles.container} ref={scrollContainerRef}>
			{form?.questions && (
				<Progress
					size="sm"
					radius={0}
					className={styles.progress}
					value={(100 / form.questions.length) * (currentStep + 1)}
					transitionDuration={500}
				/>
			)}

			{exitButton && <div className={styles.exitButton}>{exitButton}</div>}

			{!form ? (
				<FetchState isLoading={isLoading} error={error} />
			) : (
				<FormQuestions
					questions={form.questions}
					setCurrentStep={setCurrentStep}
					containerRef={scrollContainerRef}
					onSubmit={handleSubmit}
					goToNextStep={goToNextStep}
				/>
			)}

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
