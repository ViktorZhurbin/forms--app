import { useParams } from "wouter";
import { LocalStorage } from "~/constants/localStorage";

export const useFormNanoId = () => {
	const paramsNanoId = useParams<{ workspaceId?: string; formId?: string }>()
		?.formId;

	if (paramsNanoId) {
		return paramsNanoId;
	}

	try {
		const demoLocalNanoId = localStorage.getItem(LocalStorage.DemoFormId);

		if (demoLocalNanoId) {
			return demoLocalNanoId;
		}
	} catch {
		return "";
	}

	return "";
};
