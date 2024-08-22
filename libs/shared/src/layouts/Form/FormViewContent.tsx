import { useCallback, useEffect } from "react";
import { getFieldProps } from "~/components/fields/FieldBase/getFieldProps";
import { FieldView } from "~/components/fields/FieldView/FieldView";
import { SlideItem } from "~/components/slider/SlideItem/SlideItem";
import { useSlider } from "~/components/slider/context/SliderContext";
import { useIsPreview } from "~/hooks/searchParams/useIsPreview";
import { useAnswer } from "~/hooks/useAnswer";
import type { TField } from "~/models/field/schema";
import type { TAnswer, TResponse } from "~/models/response/schema";
import { isSingleChoiceField } from "~/utils/fieldPredicates";
import { FormNavButtons } from "./FormNavButtons/FormNavButtons";
import styles from "./FormView.module.css";
import { validateAnswer } from "./helpers/validateAnswer";
import { useGestures } from "./hooks/useGestures";

export const FormViewContent = (props: {
	fields: TField[];
	response?: TResponse;
}) => {
	const { fields } = props;

	const isPreview = useIsPreview();

	const { createOrUpdateAnswer, submitAnswer, previewResponse } = useAnswer();

	const response = isPreview ? previewResponse : props.response;

	const {
		isEnd,
		activeIndex,
		slideNext,
		errorType,
		setErrorType,
		setShowError,
	} = useSlider();

	useEffect(() => {
		const { errorType } = validateAnswer({
			response,
			field: fields[activeIndex],
		});

		setErrorType(errorType);
	}, [activeIndex, fields, response, setErrorType]);

	const handleSubmit = useCallback(async () => {
		if (!isEnd) return;

		if (errorType) {
			setShowError(true);
			return;
		}

		await submitAnswer();
	}, [submitAnswer, setShowError, isEnd, errorType]);

	const handleAnswer = useCallback(
		async (answer: TAnswer) => {
			setShowError(false);
			setErrorType(null);

			await createOrUpdateAnswer(answer);

			if (!isEnd && isSingleChoiceField(answer.field) && answer.value.length) {
				setTimeout(() => {
					slideNext(true);
				}, 700);
			}
		},
		[createOrUpdateAnswer, isEnd, slideNext, setShowError, setErrorType],
	);

	const gestureEvents = useGestures();

	const lastFieldIndex = fields.length - 1;

	const activeFieldButtonText = getFieldProps({
		field: fields[activeIndex],
		isLastQuestion: lastFieldIndex === activeIndex,
	}).button.text;

	const onSubmit = useCallback(() => {
		if (isEnd) {
			handleSubmit();
		} else {
			slideNext();
		}
	}, [isEnd, handleSubmit, slideNext]);

	return (
		<div {...gestureEvents}>
			{fields.map((field, index, list) => {
				const answer = response?.answers[field.id];

				const prevField = validateAnswer({
					response,
					field: list[index - 1],
				});

				return (
					<SlideItem key={field.id} index={index}>
						<FieldView
							field={field}
							index={index}
							answer={answer}
							onAnswer={handleAnswer}
							isNextHidden={!!prevField.errorType}
							onSubmit={onSubmit}
						/>
					</SlideItem>
				);
			})}
			<FormNavButtons
				className={styles.navButtons}
				buttonText={activeFieldButtonText}
				onSubmit={onSubmit}
			/>
		</div>
	);
};
