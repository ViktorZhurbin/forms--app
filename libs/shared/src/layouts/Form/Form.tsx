import { FetchState } from "~/components/FetchState/FetchState";
import { useCurrentFormFieldsQuery } from "~/models/field/read";
import { FormNotFound } from "../FormNotFound/FormNotFound";
import { FormView } from "./FormView/FormView";

type FormProps = {
	isPreview?: boolean;
	exitButton?: React.ReactElement;
};

export const Form = ({ isPreview, exitButton }: FormProps) => {
	const { isLoading, error, data } = useCurrentFormFieldsQuery();

	if (error || isLoading) {
		return <FetchState isLoading={isLoading} error={error} />;
	}

	if (!Array.isArray(data?.fields)) {
		return <FormNotFound text="This form doesn't seem to exist" />;
	}

	if (!data.fields.length) {
		return <FormNotFound text="This form is empty" />;
	}

	const fieldsToDisplay = isPreview
		? data.fields
		: data.fields.filter((field) => field.isPublished);

	return <FormView questions={fieldsToDisplay} exitButton={exitButton} />;
};
