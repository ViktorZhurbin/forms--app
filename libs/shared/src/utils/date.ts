const getNowISOString = () => new Date().toISOString();

const getTimeFromISOString = (isoString?: string) => {
	return isoString ? new Date(isoString).getTime() : 0;
};

const formatDate = new Intl.DateTimeFormat("en-US", {
	dateStyle: "medium",
}).format;

const formatTime = new Intl.DateTimeFormat("en-US", {
	timeStyle: "short",
	hourCycle: "h23",
}).format;

const formatISODate = (isoString?: string) => {
	if (!isoString) return;

	const date = new Date(isoString);

	return {
		date: formatDate(date),
		time: formatTime(date),
	};
};

export { getNowISOString, getTimeFromISOString, formatISODate };
