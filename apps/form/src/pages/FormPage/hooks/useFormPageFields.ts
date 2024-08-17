import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { useQuery } from "@/shared/models/db";
import { getFieldsAndEndings } from "@/shared/utils/field";

export const useFormPageFields = () => {
	const formNanoId = useFormNanoId();

	const { data, isLoading, error } = useQuery({
		forms: {
			$: {
				where: { nanoId: formNanoId },
			},
			fields: {},
		},
	});

	const form = data?.forms?.[0];
	const { fieldsAndEndings } = getFieldsAndEndings(form?.fields);

	return {
		isLoading,
		error,
		fieldsAndEndings,
	};
};
