import { useLocalResponseWithFormId } from "~/hooks/useLocalResponseWithFormId";
import { useDbQuery } from "../db";

const useCurrentFormResponsesQuery = () => {
	const [ids] = useLocalResponseWithFormId();

	return useDbQuery({
		responses: {
			$: { where: { id: ids.responseId } },
		},
	});
};

export { useCurrentFormResponsesQuery };
