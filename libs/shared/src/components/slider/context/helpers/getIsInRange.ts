export const getIsWithinRange = (index: unknown, length: number) => {
	if (typeof index !== "number") return false;

	return index >= 0 && index < length;
};
