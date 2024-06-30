import { useParams } from "wouter";

export const useFormId = () => {
	// if no id, the route won't be rendered
	const formId = useParams()?.id as string;

	return formId;
};
