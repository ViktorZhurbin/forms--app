import { useCallback, useEffect, useState } from "react";
import { getFieldProps } from "~/components/fields/FieldBase/getFieldProps";
import { FieldView } from "~/components/fields/FieldView/FieldView";
import { SlideItem } from "~/components/slider/SlideItem/SlideItem";
import { useSlider } from "~/components/slider/context/SliderContext";
import { ErrorType } from "~/constants/fieldError";
import { useIsPreview } from "~/hooks/searchParams/useIsPreview";
import { useAnswer } from "~/hooks/useAnswer";
import type { TField, TFieldEnding } from "~/models/field/schema";
import type { TAnswer, TResponse } from "~/models/response/schema";
import { isSingleChoiceField } from "~/utils/fieldPredicates";
import { Ending } from "./Ending/Ending";
import { FormNavButtons } from "./FormNavButtons/FormNavButtons";
import styles from "./FormView.module.css";
import { getFieldState } from "./helpers/getFieldState";
import { useGestures } from "./hooks/useGestures";

export const FormViewContent = (props: {
	fields: TField[];
	endings: TFieldEnding[];
	response?: TResponse;
}) => {
	const { fields, endings } = props;

	const isPreview = useIsPreview();

	const [errorType, setErrorType] = useState<ErrorType | null>(null);
	const { createOrUpdateAnswer, submitAnswer, previewResponse } = useAnswer();

	const response = isPreview ? previewResponse : props.response;
	const isSubmitted = !!response?.submittedAt;

	const {
		isEnd,
		isBeginning,
		activeIndex,
		slideNext,
		slidePrev,
		isAnswerRequired,
		setAnswerRequired,
	} = useSlider();

	useEffect(() => {
		const fieldState = getFieldState({
			response,
			field: fields[activeIndex],
		});

		setAnswerRequired(fieldState.isRequiredAndHasNoAnswer);
	}, [activeIndex, setAnswerRequired, fields, response]);

	const handleGoBack = useCallback(() => {
		if (isBeginning) return;

		setErrorType(null);
		slidePrev();
	}, [slidePrev, isBeginning]);

	const lastFieldIndex = fields.length - 1;

	const activeFieldButtonText = getFieldProps({
		field: fields[activeIndex],
		isLastQuestion: lastFieldIndex === activeIndex,
	}).button.text;

	const handleGoNext = useCallback(
		async (params: { checkIsAnswerRequired?: boolean } = {}) => {
			if (isEnd) return;

			const { checkIsAnswerRequired = true } = params;

			if (checkIsAnswerRequired && isAnswerRequired) {
				setErrorType(ErrorType.Required);
				return;
			}

			slideNext();
		},
		[slideNext, isAnswerRequired, isEnd],
	);

	const handleSubmit = useCallback(async () => {
		if (!isEnd) return;

		if (isAnswerRequired) {
			setErrorType(ErrorType.Required);
			return;
		}

		await submitAnswer();
	}, [submitAnswer, isEnd, isAnswerRequired]);

	const handleAnswer = useCallback(
		async (answer: TAnswer) => {
			await createOrUpdateAnswer(answer);
			setErrorType(null);

			if (!isEnd && isSingleChoiceField(answer.field) && answer.value.length) {
				setTimeout(() => {
					handleGoNext({ checkIsAnswerRequired: false });
				}, 700);
			}
		},
		[createOrUpdateAnswer, handleGoNext, isEnd],
	);

	const gestureEvents = useGestures({
		goNext: handleGoNext,
		goBack: handleGoBack,
	});

	if (isSubmitted) {
		return <Ending ending={endings[0]} />;
	}

	return (
		<div {...gestureEvents}>
			{fields.map((field, index, list) => {
				const answer = response?.answers[field.id];

				const prevFieldState = getFieldState({
					response,
					field: list[index - 1],
				});

				return (
					<SlideItem key={field.id} index={index}>
						<FieldView
							order={index + 1}
							field={field}
							answer={answer}
							errorType={errorType}
							onAnswer={handleAnswer}
							isLastQuestion={lastFieldIndex === index}
							onSubmit={isEnd ? handleSubmit : handleGoNext}
							isNextHidden={prevFieldState.isRequiredAndHasNoAnswer}
						/>
					</SlideItem>
				);
			})}
			<FormNavButtons
				className={styles.navButtons}
				buttonText={activeFieldButtonText}
				onGoBack={handleGoBack}
				onGoNext={handleGoNext}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};
