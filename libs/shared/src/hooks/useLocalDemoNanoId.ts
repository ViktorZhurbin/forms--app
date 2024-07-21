import { useLocalStorage } from "@mantine/hooks";
import { LocalStorage } from "~/constants/localStorage";

export const useLocalDemoNanoId = () => {
	return useLocalStorage({
		key: LocalStorage.DemoFormId,
		serialize: (value) => {
			return value;
		},
		deserialize: (value) => {
			return value ?? "";
		},
	});
};
