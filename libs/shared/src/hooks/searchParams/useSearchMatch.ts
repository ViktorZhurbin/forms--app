import { useSearchParam } from "./useSearchParam";

export const useSearchMatch = (key: string, value: string) => {
	const param = useSearchParam(key);

	return param === value;
};
