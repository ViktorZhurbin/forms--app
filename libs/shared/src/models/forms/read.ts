import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useDbQuery } from "../db";
import type { TForm } from "./schema/forms";

const useAllForms = () => {
	return useDbQuery({ forms: {} });
};

const useFormQuery = (formNanoId: TForm["nanoid"]) => {
	return useDbQuery({
		forms: {
			$: { where: { nanoid: formNanoId } },
		},
	});
};

const useCurrentFormQuery = () => {
	const formNanoId = useFormNanoId();

	return useFormQuery(formNanoId);
};

const useCurrentForm = () => {
	const { data } = useCurrentFormQuery();

	return data?.forms?.[0];
};

export { useAllForms, useCurrentFormQuery, useCurrentForm };
