import { useLocalStorage } from "@mantine/hooks";
import { LocalStorage } from "~/constants/localStorage";

export const useLocalDemoNanoId = () => {
	return useLocalStorage({
		key: LocalStorage.DemoFormId,
		serialize: (value) => {
			// console.log(value);
			return value;
		},
		deserialize: (value) => {
			// console.log(value);
			return value ?? "";
		},
	});
};
