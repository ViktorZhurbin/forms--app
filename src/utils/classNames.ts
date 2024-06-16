const clx = (...classNames: Array<string | undefined | null>): string =>
	classNames.filter(Boolean).join(" ");

export { clx };
