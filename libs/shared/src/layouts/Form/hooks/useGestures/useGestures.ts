import { useSlider } from "~/components/slider/context/SliderContext";
import { useSwipe } from "./useSwipe";
import { useWheel } from "./useWheel";

export const useGestures = () => {
	const { slideNext: goNext, slidePrev: goBack } = useSlider();

	const wheelEvents = useWheel({ goNext, goBack });
	const swipeEvents = useSwipe({ goNext, goBack });

	return { ...wheelEvents, ...swipeEvents };
};
