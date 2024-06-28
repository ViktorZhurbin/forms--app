import { FormsLayout } from "~/constants/forms";
import { Routes } from "~/constants/location";
import { db } from "~/models/db";
import { GridView } from "./GridView/GridView";
import { ListView } from "./ListView/ListView";

type FormsViewProps = {
	view: FormsLayout;
};

export const FormsView = ({ view }: FormsViewProps) => {
	const { isLoading, error, data } = db.useQuery({ forms: {} });

	if (isLoading) {
		return <div>Fetching data...</div>;
	}

	if (error) {
		return <div>Error fetching data: {error.message}</div>;
	}

	const ViewComponent = view === FormsLayout.List ? ListView : GridView;

	return <ViewComponent forms={data.forms} getHref={Routes.getFormPath} />;
};
