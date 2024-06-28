import type { FormType } from "~/models/forms/forms";

type FormViewProps = {
	forms: FormType[];
	getHref: (id: FormType["id"]) => string;
	getDeleteButton: (id: FormType["id"]) => JSX.Element;
};

export type { FormViewProps };
