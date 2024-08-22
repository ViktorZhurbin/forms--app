export function isEmail(value?: string) {
	return value
		? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
		: false;
}
