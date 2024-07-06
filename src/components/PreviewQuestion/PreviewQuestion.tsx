import { useIntersection } from "@mantine/hooks";
import { type RefObject, useEffect } from "react";
import type { TQuestion } from "~/models/forms/schema/questions";
import { Question } from "../Question/Question";
import styles from "./PreviewQuestion.module.css";
// import { getPositionDataAttribute } from "./helpers/getPositionDataAttribute";

export type PreviewQuestionProps = {
	index: number;
	isLast: boolean;
	question: TQuestion;
	containerRef: RefObject<HTMLDivElement>;
	onSubmit: () => void;
	setStep: (step: number) => void;
	goToNextStep: () => void;
};

export const PreviewQuestion = ({
	index,
	containerRef,
	isLast,
	question,
	onSubmit,
	setStep,
	goToNextStep,
}: PreviewQuestionProps) => {
	const { ref, entry } = useIntersection({
		root: containerRef.current,
		threshold: 1,
	});

	useEffect(() => {
		if (entry?.isIntersecting) {
			setStep(index);
		}
	});

	return (
		<div
			ref={ref}
			className={styles.root}
			data-step={index}
			// data-position={getPositionDataAttribute(index, currentStep)}
		>
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
