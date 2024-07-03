import type { FormType } from "~/models/forms/forms";

interface FormViewProps extends Pick<FormType, "id" | "name"> {
	className: string;
	responsesText: string;
	getHref: (id: FormType["id"]) => string;
	getDeleteButton: (id: FormType["id"]) => JSX.Element;
}

export type { FormViewProps };
