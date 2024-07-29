import { FetchState } from "~/components/FetchState/FetchState";
import { useCurrentFormQuery } from "~/models/form/read";
import { FormNotFound } from "../FormNotFound/FormNotFound";
import { FormView } from "./FormView/FormView";

type FormProps = {
	isPreview?: boolean;
	exitButton?: React.ReactElement;
};

export const Form = ({ isPreview, exitButton }: FormProps) => {
	const { isLoading, error, data } = useCurrentFormQuery();

	if (error || isLoading) {
		return <FetchState isLoading={isLoading} error={error} />;
	}

	const form = data.forms?.[0];

	if (!form) {
		return <FormNotFound />;
	}

	const questions = isPreview ? form.draftQuestions : form.questions;

	return <FormView questions={questions} exitButton={exitButton} />;
};
