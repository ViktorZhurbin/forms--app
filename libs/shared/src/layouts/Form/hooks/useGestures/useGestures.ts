import { useSwipe } from "./useSwipe";
import { useWheel } from "./useWheel";

export const useGestures = (params: {
	goNext: () => void;
	goBack: () => void;
}) => {
	const { goNext, goBack } = params;

	const wheelEvents = useWheel({ goNext, goBack });
	const swipeEvents = useSwipe({ goNext, goBack });

	return { ...wheelEvents, ...swipeEvents };
};
