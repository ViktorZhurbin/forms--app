import "swiper/css";
import "swiper/css/mousewheel";
import "swiper/css/effect-fade";
import "swiper/css/a11y";
import { A11y, EffectFade, Mousewheel } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { FieldView } from "~/components/fields/FieldView/FieldView";
import type { TField } from "~/models/field/schema";
import type { TResponse } from "~/models/response/schema";
import { FormNavButtons } from "../FormNavButtons/FormNavButtons";
import styles from "./FormView.module.css";

type FormViewProps = {
	fields: TField[];
	response?: TResponse;
	isPreview?: boolean;
	exitButton?: React.ReactElement;
};

export const FormView = ({ fields, response, exitButton }: FormViewProps) => {
	return (
		<div className={styles.container}>
			{/* TODO:
			- move inside Swiper
			- extract into a component
			- use siper instance inside
			- refine calculations based on answers
			<Progress
				size="sm"
				radius={0}
				aria-label="Form completion in percentage"
				className={styles.progress}
				value={Math.round((100 / fields.length) * (currentStep + 1))}
				transitionDuration={300}
			/> */}

			{exitButton && <div className={styles.exitButton}>{exitButton}</div>}

			<Swiper
				speed={400}
				effect="fade"
				fadeEffect={{
					crossFade: true,
				}}
				a11y={{
					firstSlideMessage: "This is the start of the form",
					lastSlideMessage: "This is the end of the form",
					nextSlideMessage: "Next question",
					prevSlideMessage: "Previous question",
				}}
				spaceBetween={0}
				slidesPerView={1}
				className={styles.swiper}
				direction="vertical"
				modules={[Mousewheel, EffectFade, A11y]}
				mousewheel={{
					forceToAxis: true,
				}}
				// onSlideChange={(swiper) => console.log("slide change")}
				// onSwiper={(swiper) => setSwiper(swiper)}
			>
				{fields.flatMap((field, index) => {
					const answer = response?.answers[field.id];

					return (
						<SwiperSlide key={field.id} className={styles.swiperSlide}>
							{({ isActive, isPrev, isNext }) => {
								if (!isActive && !isPrev && !isNext) return null;

								return (
									<FieldView order={index + 1} field={field} answer={answer} />
								);
							}}
						</SwiperSlide>
					);
				})}
				<FormNavButtons className={styles.navButtons} />
			</Swiper>
		</div>
	);
};
