import { useDbQuery } from "../db";
import type { FormType } from "./forms";

const useForm = (formId: FormType["id"]) => {
	return useDbQuery({
		forms: {
			$: { where: { id: formId } },
		},
	});
};

export { useForm };
