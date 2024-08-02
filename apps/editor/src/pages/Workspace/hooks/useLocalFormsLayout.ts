import { useLocalStorage } from "@mantine/hooks";
import { FormsLayout } from "~/constants/forms";
import { LocalStorage } from "~/constants/localStorage";

export const useLocalFormsLayout = () => {
	return useLocalStorage({
		key: LocalStorage.FormsLayout,
		defaultValue: FormsLayout.Grid,

		serialize: (value) => {
			return value;
		},

		deserialize: (value) => {
			return value ? (value as FormsLayout) : FormsLayout.Grid;
		},
	});
};
