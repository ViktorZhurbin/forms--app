import { useCurrentFormQuery } from "@/shared/models/form/read";
import { NotFound } from "../NotFound/NotFound";
import { Header } from "./Header/Header";
import { EditorBase } from "./layouts/EditorBase/EditorBase";

export const Editor = () => {
	const { data } = useCurrentFormQuery();

	const formNotFound = data?.forms.length === 0;

	if (formNotFound) {
		return <NotFound />;
	}

	return <EditorBase header={<Header />} />;
};
