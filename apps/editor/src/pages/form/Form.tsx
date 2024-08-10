import { useParams } from "wouter";
import { type FormPathParams, Tabs } from "~/constants/routes";
import { Header } from "./components/Header/Header";
import { FormLayout } from "./layouts/FormLayout";
import { Editor } from "./tabs/Editor/Editor";
import { Results } from "./tabs/Results/Results";

export const Form = () => {
	const { tabName } = useParams<FormPathParams>();

	const header = <Header />;
	const content = getTabByName(tabName);

	return <FormLayout header={header}>{content}</FormLayout>;
};

function getTabByName(tabName?: string) {
	switch (tabName) {
		case Tabs.Results:
			return <Results />;

		default:
			return <Editor />;
	}
}
