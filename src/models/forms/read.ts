import { useDbQuery } from "../db";
import type { TForm } from "./schema";

const useFormQuery = (formId: TForm["id"]) => {
	return useDbQuery({
		forms: {
			$: { where: { id: formId } },
		},
	});
};

const useForm = (formId: TForm["id"]) => {
	const { data } = useFormQuery(formId);

	return data?.forms[0];
};

export { useForm };
