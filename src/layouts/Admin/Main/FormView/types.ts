import type { FormType } from "~/models/forms/forms";

interface FormViewProps extends FormType {
	getHref: (id: FormType["id"]) => string;
	getDeleteButton: (id: FormType["id"]) => JSX.Element;
}

export type { FormViewProps };
