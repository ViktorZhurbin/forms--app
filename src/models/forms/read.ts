import { useDbQuery } from "../db";
import type { FormType } from "./forms";

const useFormQuery = (formId: FormType["id"]) => {
	return useDbQuery({
		forms: {
			$: { where: { id: formId } },
		},
	});
};

const useForm = (formId: FormType["id"]) => {
	const { data } = useFormQuery(formId);

	return data?.forms[0];
};

export { useForm };
