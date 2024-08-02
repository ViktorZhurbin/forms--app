import { FetchState } from "@/shared/components/FetchState/FetchState";
import { Routes } from "@/shared/constants/routes";
import { useAuth } from "@/shared/models/db";
import { Redirect } from "wouter";
import { HeaderDemo } from "../Editor/Header/HeaderDemo";
import { EditorBase } from "../Editor/components/EditorBase/EditorBase";
import { useDemoForm } from "./hooks/useDemoForm";

export const EditorDemo = () => {
	const auth = useAuth();

	const { isLoading, error } = useDemoForm();

	if (auth.user) {
		return <Redirect to={Routes.ROOT} />;
	}

	if (isLoading || error) {
		return <FetchState fullScreen isLoading={isLoading} error={error} />;
	}

	return <EditorBase header={<HeaderDemo />} />;
};
