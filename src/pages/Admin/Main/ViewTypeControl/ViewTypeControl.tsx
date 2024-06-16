import { Center, SegmentedControl } from "@mantine/core";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";
import type { FormsLayout } from "../../../../constants/forms";

type ViewTypeControlProps = {
	view: FormsLayout;
	setView: React.Dispatch<React.SetStateAction<FormsLayout>>;
};

export const ViewTypeControl = ({ view, setView }: ViewTypeControlProps) => {
	return (
		<SegmentedControl
			data={[
				{
					label: (
						<Center style={{ gap: 6 }}>
							<IconLayoutGrid />
							<span>Grid</span>
						</Center>
					),
					value: "grid",
				},
				{
					label: (
						<Center style={{ gap: 6 }}>
							<IconList />
							<span>List</span>
						</Center>
					),
					value: "list",
				},
			]}
			value={view}
			onChange={(value) => {
				setView(value as FormsLayout);
			}}
		/>
	);
};
