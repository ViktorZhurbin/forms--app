import { type WheelEventHandler, useCallback, useRef, useState } from "react";
import type { SwiperClass } from "swiper/react";

export const useWheel = (params: {
	swiper?: SwiperClass;
	goNext: () => void;
}) => {
	const { swiper, goNext } = params;
	const [isScrolling, setIsScrolling] = useState(false);
	const timeoutId = useRef<ReturnType<typeof setTimeout>>();

	const onWheel: WheelEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			if (isScrolling || !swiper || swiper.animating) return;

			setIsScrolling(true);

			if (event.deltaY > 0) {
				goNext();
			} else {
				swiper.slidePrev();
			}

			clearTimeout(timeoutId.current);
			timeoutId.current = setTimeout(() => {
				setIsScrolling(false);
			}, 2000);
		},
		[swiper, goNext, isScrolling],
	);

	return onWheel;
};
