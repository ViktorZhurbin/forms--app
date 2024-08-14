import { FetchState } from "~/components/FetchState/FetchState";
import { useCurrentFormWithFieldsQuery } from "~/models/field/read";
import { useCurrentFormResponsesQuery } from "~/models/response/read";
import { getFieldsAndEndings } from "~/utils/field";
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

	const allFields = data?.forms?.[0]?.fields;

	if (!Array.isArray(allFields)) {
		return <FormNotFound text="This form doesn't seem to exist" />;
	}

	if (!allFields.length) {
		return <FormNotFound text="This form is empty" />;
	}

	const fieldsToDisplay = isPreview
		? allFields
		: allFields.filter((field) => field.isPublished);

	const { fields, endings } = getFieldsAndEndings(fieldsToDisplay);

	const response = responsesQuery.data?.responses?.[0];

	return (
		<FormView
			isPreview={isPreview}
			fields={fields.concat(endings)}
			response={response}
			exitButton={exitButton}
		/>
	);
};
