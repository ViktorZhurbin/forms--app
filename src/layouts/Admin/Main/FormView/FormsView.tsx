import { FormsLayout } from "~/constants/forms";
import { Routes } from "~/constants/location";
import { mockForms } from "~/mocks/forms";
import { GridView } from "./GridView/GridView";
import { ListView } from "./ListView/ListView";

type FormsViewProps = {
	view: FormsLayout;
};

export const FormsView = ({ view }: FormsViewProps) => {
	const ViewComponent = view === FormsLayout.List ? ListView : GridView;

	return <ViewComponent forms={mockForms} getHref={Routes.getFormPath} />;
};
