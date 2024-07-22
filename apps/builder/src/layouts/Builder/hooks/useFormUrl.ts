import { Routes } from "@/shared/constants/location";
import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { FORM_URL_BASE } from "~/utils/env";

export const useFormUrl = () => {
	const formId = useFormNanoId();

	if (!formId) return;

	const path = Routes.getFormPath({ formId });

	if (URL.canParse(path, FORM_URL_BASE)) {
		return new URL(path, FORM_URL_BASE).toString();
	}
};
