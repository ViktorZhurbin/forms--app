import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useDbQuery } from "../db";
import type { TForm } from "./schema/forms";

const useCurrentFormQuery = () => {
	const formNanoId = useFormNanoId();

	return useDbQuery({
		forms: {
			$: { where: { nanoid: formNanoId } },
		},
	});
};

const useCurrentForm = () => {
	const { data } = useCurrentFormQuery();

	return data?.forms?.[0] as TForm | undefined;
};

export { useCurrentFormQuery, useCurrentForm };
