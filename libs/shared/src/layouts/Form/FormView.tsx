import "swiper/css";
import "swiper/css/a11y";
import { A11y } from "swiper/modules";

import { useCallback, useEffect, useState } from "react";
import {
	Swiper,
	type SwiperClass,
	type SwiperProps,
	SwiperSlide,
} from "swiper/react";
import { DarkModeToggle } from "~/components/DarkModeToggle/DarkModeToggle";
import { FieldView } from "~/components/fields/FieldView/FieldView";
import { useAnswer } from "~/hooks/useAnswer";
import type { TField } from "~/models/field/schema";
import type { TAnswer, TResponse } from "~/models/response/schema";
import { FormNavButtons } from "./FormNavButtons/FormNavButtons";
import styles from "./FormView.module.css";
import { getFieldState } from "./helpers/getFieldState";
import { useGoNext } from "./hooks/useGoNext";
import { useWheel } from "./hooks/useWheel";

const swiperProps: SwiperProps = {
	speed: 450,
	a11y: {
		firstSlideMessage: "This is the start of the form",
		lastSlideMessage: "This is the end of the form",
		nextSlideMessage: "Next question",
		prevSlideMessage: "Previous question",
	},
	spaceBetween: 0,
	slidesPerView: 1,
	className: styles.swiper,
	direction: "vertical" as const,
	modules: [A11y],
	mousewheel: {
		// sensitivity: 1,
		// thresholdDelta: 50,
		forceToAxis: true,
	},
};

type FormViewProps = {
	fields: TField[];
	response?: TResponse;
	isPreview?: boolean;
	exitButton?: React.ReactElement;
};

export const FormView = ({
	fields,
	response,
	exitButton,
	isPreview,
}: FormViewProps) => {
	const [swiper, setSwiper] = useState<SwiperClass>();
	const [activeIndex, setActiveIndex] = useState(0);
	const [allowSlideNext, setAllowSlideNext] = useState(true);
	const [showRequiredError, setShowRequiredError] = useState(false);

	useEffect(() => {
		if (!swiper) return;

		const fieldState = getFieldState({
			fields,
			response,
			index: activeIndex,
		});

		setAllowSlideNext(!fieldState.isRequiredAndHasNoAnswer);
	}, [activeIndex, fields, response, swiper]);

	const handleGoNext = useGoNext({
		swiper,
		allowSlideNext,
		setShowRequiredError,
	});

	const { createOrUpdateAnswer, submitAnswer } = useAnswer();

	const handleAnswer = useCallback(
		async (answer: TAnswer) => {
			await createOrUpdateAnswer(answer);
			setShowRequiredError(false);
		},
		[createOrUpdateAnswer],
	);

	const handleSubmit = useCallback(async () => {
		if (swiper?.isEnd) {
			await submitAnswer();
		} else {
			handleGoNext();
		}
	}, [submitAnswer, handleGoNext, swiper?.isEnd]);

	const onWheel = useWheel({ swiper, goNext: handleGoNext });

	return (
		<div className={styles.container} onWheel={onWheel}>
			<div className={styles.topFixed}>
				{isPreview && exitButton ? exitButton : <DarkModeToggle />}
			</div>
			<Swiper
				{...swiperProps}
				onSwiper={(swiper) => {
					swiper.slideNext = (...swiperParams) =>
						handleGoNext({ swiperParams });

					setSwiper(swiper);
				}}
				onSlideChange={(swiper) => {
					setActiveIndex(swiper.activeIndex);
				}}
			>
				{fields.map((field, index, list) => {
					const answer = response?.answers[field.id];

					const prevFieldState = getFieldState({
						index: index - 1,
						fields: list,
						response,
					});

					return (
						<SwiperSlide key={field.id} className={styles.swiperSlide}>
							<FieldView
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
						</SwiperSlide>
					);
				})}
				<FormNavButtons className={styles.navButtons} onGoNext={handleGoNext} />
			</Swiper>
		</div>
	);
};
