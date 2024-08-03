import type { TResponse } from "@/shared/models/response/schema";
import { useMemo } from "react";
import { FilterTab } from "../constants/filter";

export const useFilteredResponses = (params: {
	filter: FilterTab;
	responses: TResponse[];
}) => {
	const { filter, responses } = params;

	const filtered = useMemo(
		() =>
			responses.reduce<{ partial: TResponse[]; completed: TResponse[] }>(
				(acc, response) => {
					if (response.submittedAt) {
						acc.completed.push(response);
					} else {
						acc.partial.push(response);
					}

					return acc;
				},
				{ partial: [], completed: [] },
			),
		[responses],
	);

	const responsesToShow = useMemo(() => {
		if (filter === FilterTab.Completed) {
			return filtered.completed;
		}

		if (filter === FilterTab.Partial) {
			return filtered.partial;
		}

		return responses;
	}, [filter, responses, filtered]);

	const tabValues = useMemo(() => {
		return [
			{
				value: FilterTab.All,
				label: `All (${responses.length})`,
			},
			{
				value: FilterTab.Completed,
				label: `Completed (${filtered.completed.length})`,
			},
			{
				value: FilterTab.Partial,
				label: `Partial (${filtered.partial.length})`,
			},
		];
	}, [responses.length, filtered]);

	return { responsesToShow, tabValues };
};
