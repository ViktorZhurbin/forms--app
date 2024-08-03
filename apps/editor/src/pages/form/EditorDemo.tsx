import { FetchState } from "@/shared/components/FetchState/FetchState";
import { useAuth } from "@/shared/models/db";
import { Redirect } from "wouter";
import { Routes } from "~/constants/routes";
import { HeaderDemo } from "./components/Header/HeaderDemo";
import { useDemoForm } from "./hooks/useDemoForm";
import { FormLayout } from "./layouts/FormLayout";
import { Editor } from "./sections/Editor/Editor";

export const EditorDemo = () => {
	const auth = useAuth();

	const { isLoading, error } = useDemoForm();

	if (auth.user) {
		return <Redirect to={Routes.ROOT} />;
	}

	if (isLoading || error) {
		return <FetchState fullScreen isLoading={isLoading} error={error} />;
	}

	return (
		<FormLayout header={<HeaderDemo />}>
			<Editor />
		</FormLayout>
	);
};
