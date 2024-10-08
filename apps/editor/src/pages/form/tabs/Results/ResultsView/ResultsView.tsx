import type { TField } from "@/shared/models/field/schema";
import type { TResponse } from "@/shared/models/response/schema";
import { Center } from "@mantine/core";
import { useState } from "react";
import { ResultsTable } from "../ResultsTable/ResultsTable";
import { ResultsTabs } from "../ResultsTabs/ResultsTabs";
import { FilterTab } from "../constants/filter";
import { useFilteredResponses } from "../hooks/useFilteredResponses";
import styles from "./ResultsView.module.css";

export const ResultsView = (props: {
	fields: TField[];
	responses: TResponse[];
}) => {
	const { fields, responses } = props;

	const [filter, setFilter] = useState(FilterTab.All);

	const { responsesToShow, tabValues } = useFilteredResponses({
		filter,
		responses,
	});

	if (!responsesToShow.length) {
		return <Center>No responses so far</Center>;
	}

	return (
		<div className={styles.root}>
			<ResultsTabs
				value={filter}
				tabValues={tabValues}
				onChange={(value) => {
					setFilter(value as FilterTab);
				}}
			/>

			<ResultsTable
				fields={fields}
				filter={filter}
				responses={responsesToShow}
			/>
		</div>
	);
};
