import { useFormId } from "~/layouts/Builder/hooks/useFormId";
import { useSelectedBlockId } from "~/layouts/Builder/hooks/useSelectedBlockId";
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

const useForm = (formId: TForm["id"]) => {
	const { data } = useFormQuery(formId);

	return data?.forms[0];
};

const useCurrentForm = () => {
	const formId = useFormId();

	return useForm(formId);
};

const useCurrentQuestion = () => {
	const form = useCurrentForm();
	const selectedBlockId = useSelectedBlockId();

	return form?.questions.find((question) => question.id === selectedBlockId);
};

export {
	useAllForms,
	useForm,
	useFormQuery,
	useCurrentForm,
	useCurrentQuestion,
};
