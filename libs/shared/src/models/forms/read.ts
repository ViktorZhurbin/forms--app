import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useDbQuery } from "../db";

const useCurrentFormQuery = () => {
	const formNanoId = useFormNanoId();

	return useDbQuery({
		forms: {
			$: { where: { nanoId: formNanoId } },
			workspaces: {},
		},
	});
};

const useCurrentForm = () => {
	const { data } = useCurrentFormQuery();

	return data?.forms?.[0];
};

const useCurrentFormWorkspace = () => {
	const form = useCurrentForm();

	return form?.workspaces[0];
};

export { useCurrentFormQuery, useCurrentForm, useCurrentFormWorkspace };
