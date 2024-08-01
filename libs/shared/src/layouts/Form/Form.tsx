import { FetchState } from "~/components/FetchState/FetchState";
import { useCurrentFormFieldsQuery } from "~/models/field/read";
import { useCurrentFormResponsesQuery } from "~/models/response/read";
import { FormNotFound } from "../FormNotFound/FormNotFound";
import { FormView } from "./FormView/FormView";

type FormProps = {
	isPreview?: boolean;
	exitButton?: React.ReactElement;
};

export const Form = ({ isPreview, exitButton }: FormProps) => {
	const fieldsQuery = useCurrentFormFieldsQuery();
	const responsesQuery = useCurrentFormResponsesQuery();

	const error = fieldsQuery.error;
	const isLoading = fieldsQuery.isLoading;

	if (error || isLoading) {
		return <FetchState fullScreen isLoading={isLoading} error={error} />;
	}

	const fields = fieldsQuery.data?.fields;

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
			fields={fieldsToDisplay}
			response={responsesQuery.data?.responses?.[0]}
			exitButton={exitButton}
		/>
	);
};
