import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useDbQuery } from "../db";

const useCurrentFormFieldsQuery = () => {
	const formNanoId = useFormNanoId();

	return useDbQuery({
		fields: {
			$: {
				where: { formNanoId },
			},
		},
	});
};

const useFormFields = () => {
	const { data } = useCurrentFormFieldsQuery();

	return data?.fields;
};

const useFormPublishedFields = () => {
	const fields = useFormFields();

	return fields?.filter(({ isPublished }) => isPublished);
};

const useOrderedFormFields = () => {
	const fields = useFormFields();

	return fields?.toSorted((a, b) => a.order - b.order);
};

export {
	useCurrentFormFieldsQuery,
	useFormFields,
	useFormPublishedFields,
	useOrderedFormFields,
};
