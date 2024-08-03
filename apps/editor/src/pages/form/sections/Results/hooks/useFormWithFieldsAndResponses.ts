import { useFormNanoId } from "@/shared/hooks/useFormNanoId";
import { useQuery } from "@/shared/models/db";

export const useFormWithFieldsAndResponses = () => {
	const formNanoId = useFormNanoId();

	return useQuery({
		forms: {
			$: {
				where: {
					nanoId: formNanoId,
				},
			},
			fields: {},
			responses: {},
		},
	});
};
