const getPositionDataAttribute = (index: number, step: number) => {
	switch (index) {
		case step:
			return "current";

		case step - 1:
			return "previous";

		case step + 1:
			return "next";

		default:
			return "hidden";
	}
};

export { getPositionDataAttribute };
