import { Routes } from "@/shared/constants/location";
import { useFormId } from "@/shared/hooks/useFormId";
import { formUrlBase } from "@/shared/utils/env";

export const useFormUrl = () => {
	const formId = useFormId();
	const path = Routes.getFormPath(formId);

	return URL.canParse(path, formUrlBase)
		? new URL(path, formUrlBase).toString()
		: "";
};
