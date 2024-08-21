import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { useQuery } from "@/shared/models/db";
import { getFieldsAndEndings } from "@/shared/utils/field";

export const useFormPreviewFields = () => {
	const formNanoId = useFormNanoId();

	const { data, isLoading, error } = useQuery({
		forms: {
			$: {
				where: { nanoId: formNanoId },
			},
			draftFields: {},
		},
	});

	const form = data?.forms?.[0];
	const { fields, endings } = getFieldsAndEndings(form?.draftFields);

	return {
		isLoading,
		error,
		fields,
		endings,
	};
};
