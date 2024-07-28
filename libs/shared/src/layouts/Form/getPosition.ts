const map = new Map([
	[-1, "previous"],
	[0, "current"],
	[1, "next"],
]);

export const getPosition = (currentStep: number, index: number) => {
	return map.get(index - currentStep);
};
