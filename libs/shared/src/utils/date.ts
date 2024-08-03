const getNowISOString = () => new Date().toISOString();

const getTimeFromISOString = (isoString: string) =>
	new Date(isoString).getTime();

export { getNowISOString, getTimeFromISOString };
