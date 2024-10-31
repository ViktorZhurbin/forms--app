import { FetchState } from "@/shared/components/FetchState/FetchState";
import { SearchParams } from "@/shared/constants/location";
import { ModalIds } from "@/shared/constants/modals";
import { useAuth } from "@/shared/models/db";
import { useFormDraftFields } from "@/shared/models/field/read";
import { isEndingField } from "@/shared/utils/fieldPredicates";
import { navigateWithSearch } from "@/shared/utils/searchParams";
import { useEffect } from "react";
import { Redirect } from "wouter";
import { Routes } from "~/constants/routes";
import { HeaderDemo } from "./components/Header/HeaderDemo";
import { useDemoForm } from "./hooks/useDemoForm";
import { FormLayout } from "./layouts/FormLayout";
import { Editor } from "./tabs/Editor/Editor";

export const EditorDemo = () => {
	const auth = useAuth();

	const { isLoading, error } = useDemoForm();

	const draftFields = useFormDraftFields();
	const hasQuestions = !draftFields.every((field) => isEndingField(field));

	useEffect(() => {
		if (hasQuestions || isLoading) return;

		navigateWithSearch(
			{ [SearchParams.MODAL]: ModalIds.ADD_FIELD },
			Routes.CREATE,
		);
	}, [isLoading, hasQuestions]);

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
