import { useCallback, useEffect, useState } from "react";
import { getFieldProps } from "~/components/fields/FieldBase/getFieldProps";
import { FieldView } from "~/components/fields/FieldView/FieldView";
import { SlideItem } from "~/components/slider/SlideItem/SlideItem";
import { useSlider } from "~/components/slider/context/SliderContext";
import { useAnswer } from "~/hooks/useAnswer";
import type { TField } from "~/models/field/schema";
import type { TAnswer, TResponse } from "~/models/response/schema";
import { FormNavButtons } from "./FormNavButtons/FormNavButtons";
import styles from "./FormView.module.css";
import { getFieldState } from "./helpers/getFieldState";
import { useWheel } from "./hooks/useWheel";

export const FormViewContent = (props: {
	fields: TField[];
	response?: TResponse;
}) => {
	const { fields, response } = props;

	const [showRequiredError, setShowRequiredError] = useState(false);

	const {
		isEnd,
		activeIndex,
		allowSlideNext,
		slideNext,
		slidePrev,
		setAllowSlideNext,
	} = useSlider();

	useEffect(() => {
		const fieldState = getFieldState({
			response,
			field: fields[activeIndex],
		});

		setAllowSlideNext(!fieldState.isRequiredAndHasNoAnswer);
	}, [activeIndex, setAllowSlideNext, fields, response]);

	const handleGoNext = useCallback(
		(
			params: {
				skipCheck?: boolean;
			} = {},
		) => {
			if (!allowSlideNext && !params.skipCheck) {
				setShowRequiredError(true);
			} else {
				slideNext();
			}
		},
		[slideNext, allowSlideNext],
	);

	const handleGoBack = useCallback(() => {
		setShowRequiredError(false);
		slidePrev();
	}, [slidePrev]);

	const buttonText = getFieldProps({
		isLast: isEnd,
		field: fields[activeIndex],
	}).button.text;

	const { createOrUpdateAnswer, submitAnswer } = useAnswer();

	const handleAnswer = useCallback(
		async (answer: TAnswer) => {
			await createOrUpdateAnswer(answer);
			setShowRequiredError(false);
		},
		[createOrUpdateAnswer],
	);

	const handleSubmit = useCallback(async () => {
		if (isEnd) {
			await submitAnswer();
		} else {
			handleGoNext();
		}
	}, [submitAnswer, handleGoNext, isEnd]);

	const onWheel = useWheel({ goNext: handleGoNext, goBack: handleGoBack });

	return (
		<div onWheel={onWheel}>
			{fields.map((field, index, list) => {
				const answer = response?.answers[field.id];

				const prevFieldState = getFieldState({
					response,
					field: list[index - 1],
				});

				return (
					<SlideItem key={field.id} index={index}>
						<FieldView
							isLast={index === list.length - 1}
							order={index + 1}
							field={field}
							answer={answer}
							onGoNext={() => {
								handleGoNext({ skipCheck: true });
							}}
							onAnswer={handleAnswer}
							onSubmit={handleSubmit}
							showRequiredError={showRequiredError}
							isNextHidden={prevFieldState.isRequiredAndHasNoAnswer}
						/>
					</SlideItem>
				);
			})}
			<FormNavButtons
				className={styles.navButtons}
				buttonText={buttonText}
				onGoNext={handleGoNext}
				onGoBack={handleGoBack}
				onSubmit={handleSubmit}
			/>
		</div>
	);
};
