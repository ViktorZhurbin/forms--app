import type { SlideItemContextValue } from "../../context/SlideItemContext";

export const getSlidePosition = (
	sideItemContextValue: SlideItemContextValue,
) => {
	const { isPrev, isNext, isActive } = sideItemContextValue;

	if (isActive) {
		return "active";
	}

	if (isPrev) {
		return "previous";
	}

	if (isNext) {
		return "next";
	}
};
