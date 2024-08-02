import {
	EditorRouteUtils,
	EditorRoutes,
	TabPaths,
} from "@/shared/constants/editor.routes";
import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { useRoute } from "wouter";
import { navigate } from "wouter/use-browser-location";
import { Editor } from "./Editor";
import { Results } from "./Results";

export const FormPage = () => {
	const formNanoId = useFormNanoId();
	const [_, pathParams] = useRoute(EditorRoutes.FORM);

	if (!pathParams?.tab) {
		const formCreatePath = EditorRouteUtils.getFormCreatePath({ formNanoId });

		navigate(formCreatePath, { replace: true });
	}

	if (pathParams?.tab === TabPaths.Results) {
		return <Results />;
	}

	return <Editor />;
};
