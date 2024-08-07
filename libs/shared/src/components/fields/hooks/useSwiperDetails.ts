import { useEffect, useState } from "react";
import { type SwiperClass, useSwiper } from "swiper/react";

export const useSwiperDetails = () => {
	const [state, setState] = useState<Partial<SwiperClass>>({});

	const swiper = useSwiper();

	useEffect(() => {
		const updateState = () => {
			const { isBeginning, isEnd } = swiper;

			setState({ isBeginning, isEnd });
		};

		swiper.onAny(updateState);

		return () => {
			swiper.offAny(updateState);
		};
	}, [swiper]);

	return {
		...state,
		goToNextStep: swiper.slideNext.bind(swiper),
	};
};
