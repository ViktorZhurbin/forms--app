import { useParams } from "wouter";
import { type FormPathParams, Tabs } from "~/constants/routes";
import { Header } from "./components/Header/Header";
import { FormLayout } from "./layouts/FormLayout";
import { Editor } from "./sections/Editor/Editor";
import { Results } from "./sections/Results";

export const Form = () => {
	const { tabName } = useParams<FormPathParams>();

	const header = <Header />;
	const content = getContentByTabname(tabName);

	return <FormLayout header={header}>{content}</FormLayout>;
};

function getContentByTabname(tabName?: string) {
	switch (tabName) {
		case Tabs.Results:
			return <Results />;

		default:
			return <Editor />;
	}
}
