import { useLocalStorage } from "@mantine/hooks";
import { LocalStorage } from "~/constants/localStorage";

export const useLocalResponseWithFormId = () => {
	return useLocalStorage<{ responseId: string; formNanoId: string }>({
		key: LocalStorage.ResponseByFormId,
		defaultValue: { responseId: "", formNanoId: "" },
		serialize: (value) => {
			return JSON.stringify(value);
		},
		deserialize: (value) => {
			return JSON.parse(value ?? "");
		},
	});
};
