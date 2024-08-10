import { useFormNanoId } from "~/hooks/useFormNanoId";
import { getOrderedFields } from "~/utils/field";
import { useQuery } from "../db";

const useCurrentFormWithFieldsQuery = () => {
	const formNanoId = useFormNanoId();

	return useQuery({
		forms: {
			$: {
				where: { nanoId: formNanoId },
			},
			fields: {},
		},
	});
};

const useFormFields = () => {
	const { data } = useCurrentFormWithFieldsQuery();

	return data?.forms?.[0]?.fields;
};

const useFormPublishedFields = () => {
	const fields = useFormFields();

	return fields?.filter(({ isPublished }) => isPublished);
};

const useOrderedFormFields = () => {
	const fields = useFormFields();

	return getOrderedFields(fields);
};

export {
	useCurrentFormWithFieldsQuery,
	useFormFields,
	useFormPublishedFields,
	useOrderedFormFields,
};
