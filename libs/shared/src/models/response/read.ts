import { useLocalResponseWithFormId } from "~/hooks/useLocalResponseWithFormId";
import { useQuery } from "../db";

const useCurrentFormResponsesQuery = () => {
	const [ids] = useLocalResponseWithFormId();

	return useQuery({
		responses: {
			$: { where: { id: ids.responseId } },
		},
	});
};

export { useCurrentFormResponsesQuery };
