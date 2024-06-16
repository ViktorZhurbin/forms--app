import type { FormType } from "../../../../constants/forms";

type FormViewProps = {
	forms: FormType[];
	onClickForm: (id: FormType["id"]) => void;
};

export type { FormViewProps };
