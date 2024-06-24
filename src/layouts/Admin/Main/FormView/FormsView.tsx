import { useTable } from "tinybase/ui-react";
import { type FormType, FormsLayout } from "~/constants/forms";
import { Routes } from "~/constants/location";
import { GridView } from "./GridView/GridView";
import { ListView } from "./ListView/ListView";

type FormsViewProps = {
	view: FormsLayout;
};

export const FormsView = ({ view }: FormsViewProps) => {
	const formsTable = useTable("forms");
	const forms = Object.values(formsTable) as FormType[];

	const ViewComponent = view === FormsLayout.List ? ListView : GridView;

	return <ViewComponent forms={forms} getHref={Routes.getFormPath} />;
};
