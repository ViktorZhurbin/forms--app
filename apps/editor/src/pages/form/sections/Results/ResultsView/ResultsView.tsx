import type { TField } from "@/shared/models/field/schema";
import type { TResponse } from "@/shared/models/response/schema";
import { useState } from "react";
import { ResultsTable } from "../ResultsTable/ResultsTable";
import { ResultsTabs } from "../ResultsTabs/ResultsTabs";
import { FilterTab } from "../constants/filter";
import styles from "./ResultsView.module.css";

export const ResultsView = (props: {
	fields: TField[];
	responses: TResponse[];
}) => {
	const { fields, responses } = props;

	const [filter, setFilter] = useState(FilterTab.All);

	return (
		<div className={styles.root}>
			<ResultsTabs value={filter} onChange={setFilter} />
			<ResultsTable fields={fields} responses={responses} filter={filter} />
		</div>
	);
};
