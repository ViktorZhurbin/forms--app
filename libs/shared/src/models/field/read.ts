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
			draftFields: {},
		},
	});
};

const useFormOrderedFields = () => {
	const { data } = useCurrentFormWithFieldsQuery();

	const form = data?.forms?.[0];

	return {
		fields: getOrderedFields(form?.fields ?? []),
		draftFields: getOrderedFields(form?.draftFields ?? []),
	};
};

const useFormDraftFields = () => {
	return useFormOrderedFields().draftFields;
};

const useFormPublishedFields = () => {
	return useFormOrderedFields().fields;
};

const useOrderedFormDraftFields = () => {
	const fields = useFormDraftFields();

	return getOrderedFields(fields);
};

export {
	useCurrentFormWithFieldsQuery,
	useFormOrderedFields,
	useFormDraftFields,
	useFormPublishedFields,
	useOrderedFormDraftFields,
};
