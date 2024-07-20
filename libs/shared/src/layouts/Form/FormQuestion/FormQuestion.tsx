import { useIntersection } from "@mantine/hooks";
import { type RefObject, useEffect } from "react";
import { Question } from "~/components/question/Question";
import type { TQuestion } from "~/models/forms/schema/questions";
import styles from "./FormQuestion.module.css";

export type FormQuestionProps = {
	index: number;
	isLast: boolean;
	question: TQuestion;
	containerRef: RefObject<HTMLDivElement>;
	onSubmit: () => void;
	goToNextStep: () => void;
	setCurrentStep: (step: number) => void;
};

export const FormQuestion = ({
	index,
	containerRef,
	isLast,
	question,
	onSubmit,
	goToNextStep,
	setCurrentStep,
}: FormQuestionProps) => {
	const { ref, entry } = useIntersection({
		root: containerRef.current,
		threshold: 1,
	});

	useEffect(() => {
		if (entry?.isIntersecting) {
			setCurrentStep(index);
		}
	});

	return (
		<div ref={ref} className={styles.root} data-step={index}>
			<Question
				order={index + 1}
				isLast={isLast}
				question={question}
				onSubmitForm={onSubmit}
				goToNextStep={goToNextStep}
			/>
		</div>
	);
};
