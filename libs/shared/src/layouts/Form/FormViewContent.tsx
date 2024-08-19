import { Notification } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { getFieldProps } from "~/components/fields/FieldBase/getFieldProps";
import { FieldView } from "~/components/fields/FieldView/FieldView";
import { SlideItem } from "~/components/slider/SlideItem/SlideItem";
import { useSlider } from "~/components/slider/context/SliderContext";
import { isSingleChoiceField } from "~/constants/field";
import { useAnswer } from "~/hooks/useAnswer";
import { useIsPreview } from "~/hooks/useIsPreview";
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
	const { fields } = props;

	const isPreview = useIsPreview();

	const [showRequiredError, setShowRequiredError] = useState(false);
	const { createOrUpdateAnswer, submitAnswer, previewResponse } = useAnswer();

	const response = isPreview ? previewResponse : props.response;

	const {
		isEnd,
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
		setShowRequiredError(false);
		slidePrev();
	}, [slidePrev]);

	const buttonText = getFieldProps({
		isLast: isEnd,
		field: fields[activeIndex],
	}).button.text;

	const handleAnswer = useCallback(
		async (answer: TAnswer) => {
			await createOrUpdateAnswer(answer);
			setShowRequiredError(false);

			if (isSingleChoiceField(answer.field.type) && answer.value.length) {
				setTimeout(() => {
					slideNext({ checkAllowSlideNext: false });
				}, 700);
			}
		},
		[createOrUpdateAnswer, slideNext],
	);

	const handleSubmit = useCallback(async () => {
		if (isAnswerRequired) {
			setShowRequiredError(true);
		} else if (isEnd) {
			await submitAnswer();
		} else {
			slideNext();
		}
	}, [submitAnswer, slideNext, isEnd, isAnswerRequired]);

	const onWheel = useWheel({ goNext: handleSubmit, goBack: handleGoBack });

	return (
		<div onWheel={onWheel}>
			{fields.map((field, index, list) => {
				const answer = response?.answers[field.id];

				const prevFieldState = getFieldState({
					response,
					field: list[index - 1],
				});

				const isLast = index === list.length - 1;

				return (
					<SlideItem key={field.id} index={index}>
						<FieldView
							isLast={isLast}
							order={index + 1}
							field={field}
							answer={answer}
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
				onGoBack={handleGoBack}
				onSubmit={handleSubmit}
			/>
			{isPreview && isEnd && !!response?.submittedAt && (
				<Notification
					color="green"
					withBorder
					withCloseButton={false}
					title="Congrats!"
					className={styles.notification}
				>
					Test successful!
				</Notification>
			)}
		</div>
	);
};
