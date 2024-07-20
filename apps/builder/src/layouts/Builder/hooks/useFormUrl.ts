import { Routes } from "@/shared/constants/location";
import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { FORM_URL_BASE } from "@/shared/utils/env";

export const useFormUrl = () => {
	const nanoid = useFormNanoId();
	const path = Routes.getFormPath({ nanoid });

	return URL.canParse(path, FORM_URL_BASE)
		? new URL(path, FORM_URL_BASE).toString()
		: "";
};
