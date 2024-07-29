type GetNewFieldOrderParams = {
	selectedFieldOrder: number | undefined;
	insertBefore?: boolean;
};

// TODO: unit test this
export const getNewFieldOrder = ({
	insertBefore,
	selectedFieldOrder,
}: GetNewFieldOrderParams) => {
	if (typeof selectedFieldOrder !== "number") {
		return 0;
	}

	if (insertBefore) {
		return selectedFieldOrder;
	}

	return selectedFieldOrder + 1;
};
