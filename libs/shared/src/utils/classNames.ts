import type { ClassNames } from "@mantine/core";

type MantineClassNames = ClassNames<{
	props: Record<string, unknown>;
	stylesNames: string;
}>;

const isClassNamesRecord = (
	classNames?: MantineClassNames,
): classNames is Record<string, string> => {
	return typeof classNames === "object" && typeof classNames !== "function";
};

const mergeClassNames = (
	classesA: Record<string, string>,
	classesB?: MantineClassNames,
) => {
	if (!isClassNamesRecord(classesB)) {
		return classesA;
	}

	const uniqKeys = Object.keys({ ...classesA, ...classesB });

	return uniqKeys.reduce<Record<string, string>>((acc, key) => {
		if (classesA[key] && classesB[key]) {
			acc[key] = `${classesA[key]} ${classesB[key]}`;
		} else {
			acc[key] = classesA[key] || classesB[key];
		}

		return acc;
	}, {});
};

export { mergeClassNames };
