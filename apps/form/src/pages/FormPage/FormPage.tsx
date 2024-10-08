import { FetchState } from "@/shared/components/FetchState/FetchState";
import { FormView } from "@/shared/layouts/Form/FormView";
import { FormNotFound } from "@/shared/layouts/FormNotFound/FormNotFound";
import { useCurrentFormResponsesQuery } from "@/shared/models/response/read";
import { useFormPageFields } from "./hooks/useFormPageFields";

export const FormPage = () => {
	const { isLoading, error, fields, endings } = useFormPageFields();
	const responsesQuery = useCurrentFormResponsesQuery();

	if (error || isLoading) {
		return <FetchState fullScreen isLoading={isLoading} error={error} />;
	}

	if (!Array.isArray(fields)) {
		return <FormNotFound text="This form doesn't seem to exist" />;
	}

	if (!fields.length) {
		return <FormNotFound text="This form is empty" />;
	}

	const response = responsesQuery.data?.responses?.[0];

	return <FormView fields={fields} endings={endings} response={response} />;
};
