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

const useOrderedFormFields = () => {
	const { data } = useCurrentFormFieldsQuery();

	return data?.fields.toSorted((a, b) => a.order - b.order);
};

export { useCurrentFormFieldsQuery, useOrderedFormFields };
