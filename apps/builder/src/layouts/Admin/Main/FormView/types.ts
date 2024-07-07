import type { TForm } from "@/shared/models/forms/schema/forms";

interface FormViewProps extends Pick<TForm, "id" | "name"> {
	className: string;
	responsesText: string;
	getHref: (id: TForm["id"]) => string;
	getDeleteButton: (id: TForm["id"]) => JSX.Element;
}

export type { FormViewProps };
