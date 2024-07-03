export const getDummyFormTitle = () => {
	const positiveAdjectives = [
		"affectionate",
		"charming",
		"creative",
		"diligent",
		"energetic",
		"helpful",
	];
	const randomIndex = Math.floor(Math.random() * positiveAdjectives.length);

	return `My ${positiveAdjectives[randomIndex]} form`;
};
