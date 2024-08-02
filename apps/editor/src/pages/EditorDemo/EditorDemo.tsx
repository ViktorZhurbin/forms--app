import { FetchState } from "@/shared/components/FetchState/FetchState";
import { useAuth } from "@/shared/models/db";
import { Redirect } from "wouter";
import { EditorRoutes } from "~/constants/routes";
import { HeaderDemo } from "../Editor/Header/HeaderDemo";
import { EditorBase } from "../Editor/components/EditorBase/EditorBase";
import { useDemoForm } from "./hooks/useDemoForm";

export const EditorDemo = () => {
	const auth = useAuth();

	const { isLoading, error } = useDemoForm();

	if (auth.user) {
		return <Redirect to={EditorRoutes.ROOT} />;
	}

	if (isLoading || error) {
		return <FetchState fullScreen isLoading={isLoading} error={error} />;
	}

	return <EditorBase header={<HeaderDemo />} />;
};
