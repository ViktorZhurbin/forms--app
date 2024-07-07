const pluralize = ({
	singular,
	count,
}: { singular: string; count: number }) => {
	const noun = count === 1 ? singular : `${singular}s`;

	return `${count} ${noun}`;
};

export { pluralize };
