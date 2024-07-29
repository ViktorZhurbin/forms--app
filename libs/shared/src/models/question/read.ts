import { useFormNanoId } from "~/hooks/useFormNanoId";
import { useDbQuery } from "../db";

const useCurrentFormQuestionsQuery = () => {
	const formNanoId = useFormNanoId();

	return useDbQuery({
		questions: {
			$: { where: { formNanoId } },
		},
	});
};

export { useCurrentFormQuestionsQuery };
