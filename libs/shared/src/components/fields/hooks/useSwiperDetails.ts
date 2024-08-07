import { useEffect, useState } from "react";
import { type SwiperClass, useSwiper } from "swiper/react";

export const useSwiperDetails = () => {
	const [state, setState] = useState<Partial<SwiperClass>>({});

	const swiper = useSwiper();

	useEffect(() => {
		const updateState = () => {
			const { isBeginning, isEnd, activeIndex } = swiper;

			setState({ isBeginning, isEnd, activeIndex });
		};

		swiper.onAny(updateState);

		return () => {
			swiper.offAny(updateState);
		};
	}, [swiper]);

	return {
		swiper,
		...state,
		goToNextStep: swiper.slideNext,
	};
};
