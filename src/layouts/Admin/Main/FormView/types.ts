import type { FormType } from "~/models/forms/forms";

interface FormViewProps extends Omit<FormType, "responseCount"> {
	className: string;
	responsesText: string;
	getHref: (id: FormType["id"]) => string;
	getDeleteButton: (id: FormType["id"]) => JSX.Element;
}

export type { FormViewProps };
