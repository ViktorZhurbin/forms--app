import { useFormId } from "~/hooks/useFormId";
import { useDbQuery } from "../db";
import type { TForm } from "./schema/forms";

const useAllForms = () => {
	return useDbQuery({ forms: {} });
};

const useFormQuery = (formId: TForm["id"]) => {
	return useDbQuery({
		forms: {
			$: { where: { id: formId } },
		},
	});
};

const useCurrentFormQuery = () => {
	const formId = useFormId();

	return useFormQuery(formId);
};

const useCurrentForm = () => {
	const { data } = useCurrentFormQuery();

	return data?.forms?.[0];
};

export { useAllForms, useCurrentFormQuery, useCurrentForm };
