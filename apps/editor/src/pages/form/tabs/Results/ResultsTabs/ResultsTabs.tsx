import { Tabs } from "@mantine/core";
import type { FilterTab } from "../constants/filter";
import styles from "./ResultsTabs.module.css";

export const ResultsTabs = (props: {
	value: FilterTab;
	onChange: (value: FilterTab) => void;
	tabValues: { value: FilterTab; label: string }[];
}) => {
	const { value, onChange, tabValues } = props;

	return (
		<Tabs
			classNames={styles}
			value={value}
			onChange={(value) => {
				onChange(value as FilterTab);
			}}
		>
			<Tabs.List>
				{tabValues.map(({ value, label }) => (
					<Tabs.Tab key={value} value={value}>
						{label}
					</Tabs.Tab>
				))}
			</Tabs.List>
		</Tabs>
	);
};
