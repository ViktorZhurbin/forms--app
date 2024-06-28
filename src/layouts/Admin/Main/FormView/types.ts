import type { FormType } from "~/models/forms/forms";

type FormViewProps = {
	forms: FormType[];
	getHref: (id: FormType["id"]) => string;
};

export type { FormViewProps };
