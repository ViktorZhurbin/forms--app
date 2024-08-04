import { FetchState } from "~/components/FetchState/FetchState";
import { useCurrentFormWithFieldsQuery } from "~/models/field/read";
import { useCurrentFormResponsesQuery } from "~/models/response/read";
import { FormNotFound } from "../FormNotFound/FormNotFound";
import { FormView } from "./FormView/FormView";

type FormProps = {
	isPreview?: boolean;
	exitButton?: React.ReactElement;
};

export const Form = ({ isPreview, exitButton }: FormProps) => {
	const { isLoading, error, data } = useCurrentFormWithFieldsQuery();
	const responsesQuery = useCurrentFormResponsesQuery();

	if (error || isLoading) {
		return <FetchState fullScreen isLoading={isLoading} error={error} />;
	}

	const fields = data?.forms?.[0]?.fields;

	if (!Array.isArray(fields)) {
		return <FormNotFound text="This form doesn't seem to exist" />;
	}

	if (!fields.length) {
		return <FormNotFound text="This form is empty" />;
	}

	const fieldsToDisplay = isPreview
		? fields
		: fields.filter((field) => field.isPublished);

	return (
		<FormView
			isPreview={isPreview}
			fields={fieldsToDisplay.toSorted((a, b) => a.index - b.index)}
			response={responsesQuery.data?.responses?.[0]}
			exitButton={exitButton}
		/>
	);
};
