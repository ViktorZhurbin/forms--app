import { useLocalFormResponseId } from "~/hooks/useLocalFormResponseId";
import { useQuery } from "../db";

const useCurrentFormResponsesQuery = () => {
	const [responseId] = useLocalFormResponseId();

	return useQuery({
		responses: {
			$: { where: { id: responseId } },
		},
	});
};

export { useCurrentFormResponsesQuery };
