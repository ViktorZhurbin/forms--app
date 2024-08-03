import { Tabs } from "@mantine/core";
import { FilterTab } from "../constants/filter";

export const ResultsTabs = (props: {
	value: FilterTab;
	onChange: (value: FilterTab) => void;
}) => {
	const { value, onChange } = props;

	return (
		<Tabs
			value={value}
			onChange={(value) => {
				onChange(value as FilterTab);
			}}
		>
			<Tabs.List>
				<Tabs.Tab value={FilterTab.All}>All</Tabs.Tab>
				<Tabs.Tab value={FilterTab.Completed}>Completed</Tabs.Tab>
				<Tabs.Tab value={FilterTab.Partial}>Partial</Tabs.Tab>
			</Tabs.List>
		</Tabs>
	);
};
