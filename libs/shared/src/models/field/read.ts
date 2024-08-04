import { useFormNanoId } from "~/hooks/useFormNanoId";
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

	return fields?.toSorted((a, b) => a.index - b.index) ?? [];
};

export {
	useCurrentFormWithFieldsQuery,
	useFormFields,
	useFormPublishedFields,
	useOrderedFormFields,
};
