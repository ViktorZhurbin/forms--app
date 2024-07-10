import { Routes } from "@/shared/constants/location";
import { useFormId } from "@/shared/hooks/useFormId";
import { FORM_URL_BASE } from "@/shared/utils/env";

export const useFormUrl = () => {
	const formId = useFormId();
	const path = Routes.getFormPath(formId);

	return URL.canParse(path, FORM_URL_BASE)
		? new URL(path, FORM_URL_BASE).toString()
		: "";
};
