import { useEffect, useState } from "react";
import { navigate } from "wouter/use-browser-location";
import { type FormType, FormsLayout } from "../../../../constants/forms";
import { GridView } from "./GridView/GridView";
import { ListView } from "./ListView/ListView";

type FormsViewProps = {
	view: FormsLayout;
};

export const FormsView = ({ view }: FormsViewProps) => {
	const ViewComponent = view === FormsLayout.List ? ListView : GridView;

	const [forms, setForms] = useState<FormType[]>([]);

	useEffect(() => {
		const getForms = async () => {
			const responseJson = await fetch("/forms");
			const response = (await responseJson.json()) as { data: FormType[] };
			console.log(response);

			setForms(response.data);
		};

		getForms();
	}, []);

	return (
		<ViewComponent
			forms={forms}
			onClickForm={(id: FormType["id"]) => {
				navigate(`/forms/${id}/create`);
			}}
		/>
	);
};
