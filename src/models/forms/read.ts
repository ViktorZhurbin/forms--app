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

const useCurrentFormQuery = () => {
	const formId = useFormId();

	const query = useFormQuery(formId);

	return { ...query, data: query.data?.forms[0] };
};

const useCurrentForm = () => {
	const { data } = useCurrentFormQuery();

	return data;
};

const useCurrentQuestion = () => {
	const form = useCurrentForm();
	const selectedBlockId = useSelectedBlockId();

	const index =
		form?.questions.findIndex((question) => question.id === selectedBlockId) ??
		null;

	const question = index !== null && form?.questions[index];
	const order = index && index + 1;

	return { question, order };
};

export { useAllForms, useCurrentFormQuery, useCurrentForm, useCurrentQuestion };
