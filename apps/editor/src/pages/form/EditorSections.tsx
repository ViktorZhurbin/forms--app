import { useParams } from "wouter";
import { type FormPathParams, Tabs } from "~/constants/routes";
import { Header } from "./Header/Header";
import { FormLayout } from "./layouts/FormLayout";
import { EditorContent } from "./sections/Editor/Editor";
import { Results } from "./sections/Results";

export const EditorSections = () => {
	const { tabName } = useParams<FormPathParams>();

	return (
		<FormLayout header={<Header />}>{getContentByTabname(tabName)}</FormLayout>
	);
};

function getContentByTabname(tabName?: string) {
	switch (tabName) {
		case Tabs.Results:
			return <Results />;

		default:
			return <EditorContent />;
	}
}
