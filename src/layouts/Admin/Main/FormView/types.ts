import type { FormType } from "~/constants/forms";

type FormViewProps = {
	forms: FormType[];
	getHref: (id: FormType["id"]) => string;
};

export type { FormViewProps };
