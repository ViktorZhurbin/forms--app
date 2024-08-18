import { type Dispatch, type SetStateAction, useCallback } from "react";
import type { SwiperClass } from "swiper/react";

export const useGoNext = (params: {
	swiper?: SwiperClass;
	allowSlideNext: boolean;
	setShowRequiredError: Dispatch<SetStateAction<boolean>>;
}) => {
	const { swiper, allowSlideNext, setShowRequiredError } = params;

	return useCallback(
		(
			params: {
				skipCheck?: boolean;
				swiperParams?: Parameters<SwiperClass["slideNext"]>;
			} = { swiperParams: [] },
		) => {
			if (!swiper) return false;

			const { skipCheck, swiperParams = [] } = params;

			if (!allowSlideNext && !skipCheck) {
				setShowRequiredError(true);

				return false;
			}

			const nextIndex = swiper.activeIndex + 1;

			return swiper.slideTo(nextIndex, ...swiperParams);
		},
		[swiper, allowSlideNext, setShowRequiredError],
	);
};
