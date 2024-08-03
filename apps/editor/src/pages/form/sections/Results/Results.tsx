import { FetchState } from "@/shared/components/FetchState/FetchState";
import styles from "./Results.module.css";
import { ResultsTable } from "./ResultsTable/ResultsTable";
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

	return (
		<div className={styles.root}>
			<ResultsTable fields={form.fields} responses={form.responses} />
		</div>
	);
};
