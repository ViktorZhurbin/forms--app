import { FetchState } from "@/shared/components/FetchState/FetchState";
import { ResultsView } from "./ResultsView/ResultsView";
import { useFormWithFieldsAndResponses } from "./hooks/useFormWithFieldsAndResponses";

export const Results = () => {
	const { data, isLoading, error } = useFormWithFieldsAndResponses();

	if (isLoading || error) {
		return <FetchState fullScreen isLoading={isLoading} error={error} />;
	}

	const form = data?.forms?.[0];

	if (!form) {
		return null;
	}

	return <ResultsView fields={form.fields} responses={form.responses} />;
};
