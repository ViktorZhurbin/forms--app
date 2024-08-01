import { useCallback } from "react";
import { QuestionView } from "~/components/QuestionView/QuestionView";
import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useLocalResponseWithFormId } from "~/hooks/useLocalResponseWithFormId";
import type { TField } from "~/models/field/schema";
import type { TAnswer } from "~/models/response/schema";
import { createResponse, updateResponse } from "~/models/response/write";
import styles from "./FormQuestions.module.css";
import { getPosition } from "./getPosition";

export type FormQuestionsProps = {
	currentStep: number;
	questions: TField[];
	answers?: TAnswer[];
	onSubmit: () => void;
	goToNextStep: () => void;
};

export const FormQuestions = ({
	questions,
	answers = [],
	currentStep,
	onSubmit,
	goToNextStep,
}: FormQuestionsProps) => {
	const [{ responseId }, setLocalResponseWithFormId] =
		useLocalResponseWithFormId();

	const formNanoId = useFormNanoId();

	const handleAnswer = useCallback(
		async (answer: TAnswer) => {
			if (!responseId) {
				const responseId = await createResponse({
					formNanoId,
					answers: [answer],
				});
				setLocalResponseWithFormId({ formNanoId, responseId });

				return;
			}

			const newAnswers = answers
				.filter(({ fieldId }) => fieldId !== answer.fieldId)
				.concat(answer);

			console.log(newAnswers);

			await updateResponse({
				id: responseId,
				payload: { answers: newAnswers },
			});
		},
		[responseId, formNanoId, setLocalResponseWithFormId, answers],
	);

	return questions.flatMap((question, index) => {
		const isRendered = Math.abs(index - currentStep) <= 1;

		if (!isRendered) return [];

		const position = getPosition(currentStep, index);
		const answer = answers.find(({ fieldId }) => fieldId === question.id);

		return (
			<div
				key={question.id}
				className={styles.questionWrapper}
				data-position={position}
			>
				<QuestionView
					order={index + 1}
					isLast={index === questions.length - 1}
					field={question}
					answer={answer}
					onSubmit={onSubmit}
					onAnswer={handleAnswer}
					goToNextStep={goToNextStep}
				/>
			</div>
		);
	});
};
