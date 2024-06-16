import { navigate } from "wouter/use-browser-location";
import { type FormType, FormsLayout } from "../../../../constants/forms";
import { mockForms } from "../../../../mocks/forms";
import { GridView } from "./GridView/GridView";
import { ListView } from "./ListView/ListView";

type FormsViewProps = {
	view: FormsLayout;
};

export const FormsView = ({ view }: FormsViewProps) => {
	const ViewComponent = view === FormsLayout.List ? ListView : GridView;

	return (
		<ViewComponent
			forms={mockForms}
			onClickForm={(id: FormType["id"]) => {
				navigate(`/forms/${id}/create`);
			}}
		/>
	);
};
