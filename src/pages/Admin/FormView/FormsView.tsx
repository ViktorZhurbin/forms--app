import { navigate } from "wouter/use-browser-location";
import { type FormType, FormsLayoutType } from "../../../constants/forms";
import { mockForms } from "../../../mocks/forms";
import { GridView } from "./GridView/GridView";
import { ListView } from "./ListView/ListView";

type FormsViewProps = {
	view: FormsLayoutType;
};

export const FormsView = ({ view }: FormsViewProps) => {
	const ViewComponent = view === FormsLayoutType.List ? ListView : GridView;

	return (
		<ViewComponent
			forms={mockForms}
			onClickForm={(id: FormType["id"]) => {
				navigate(`/forms/${id}/create`);
			}}
		/>
	);
};
