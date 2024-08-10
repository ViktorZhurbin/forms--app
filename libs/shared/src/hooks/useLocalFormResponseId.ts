import { useLocalStorage } from "@mantine/hooks";
import { useFormNanoId } from "./useFormNanoId";

export const useLocalFormResponseId = () => {
	const formNanoId = useFormNanoId();

	return useLocalStorage<string>({
		key: formNanoId,
		defaultValue: "",
		serialize: (value) => {
			return JSON.stringify(value);
		},
		deserialize: (value) => {
			return JSON.parse(value ?? "");
		},
	});
};
