const clx = (
	...classNames: Array<string | boolean | undefined | null>
): string => classNames.filter(Boolean).join(" ");

export { clx };
