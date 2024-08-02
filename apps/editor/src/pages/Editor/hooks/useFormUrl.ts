import { EditorRouteUtils } from "@/shared/constants/editor.routes";
import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { FORM_URL_BASE } from "~/utils/env";

export const useFormUrl = () => {
	const formNanoId = useFormNanoId();

	if (!formNanoId) return;

	const path = EditorRouteUtils.getFormCreatePath({ formNanoId });

	if (URL.canParse(path, FORM_URL_BASE)) {
		return new URL(path, FORM_URL_BASE).toString();
	}
};
