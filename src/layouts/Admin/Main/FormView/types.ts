import type { TForm } from "~/models/forms/schema";

interface FormViewProps extends Pick<TForm, "id" | "name"> {
	className: string;
	responsesText: string;
	getHref: (id: TForm["id"]) => string;
	getDeleteButton: (id: TForm["id"]) => JSX.Element;
}

export type { FormViewProps };
