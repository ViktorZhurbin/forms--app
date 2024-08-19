export const getSlidePosition = (index: number, activeIndex: number) => {
	if (index === activeIndex) {
		return "active";
	}

	if (index === activeIndex - 1) {
		return "previous";
	}

	if (index === activeIndex + 1) {
		return "next";
	}
};
