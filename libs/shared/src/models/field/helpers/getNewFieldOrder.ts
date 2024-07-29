type GetNewFieldOrderParams = {
	selectedFieldIndex: number | undefined;
	insertBefore?: boolean;
};

// TODO: unit test this
export const getNewFieldOrder = ({
	insertBefore,
	selectedFieldIndex,
}: GetNewFieldOrderParams) => {
	if (typeof selectedFieldIndex !== "number") {
		return 0;
	}

	if (insertBefore) {
		return selectedFieldIndex;
	}

	return selectedFieldIndex + 1;
};
