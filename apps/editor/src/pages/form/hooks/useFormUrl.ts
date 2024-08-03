import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { FORM_URL_BASE } from "~/utils/env";
import { RouteUtils } from "~/utils/routes";

export const useFormUrl = () => {
	const formNanoId = useFormNanoId();

	if (!formNanoId) return;

	const path = RouteUtils.getFormPath({ formNanoId });

	if (URL.canParse(path, FORM_URL_BASE)) {
		return new URL(path, FORM_URL_BASE).toString();
	}
};
