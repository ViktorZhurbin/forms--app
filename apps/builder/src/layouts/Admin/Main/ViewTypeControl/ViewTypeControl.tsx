import { Group, SegmentedControl } from "@mantine/core";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";
import type { FormsLayout } from "~/constants/forms";

type ViewTypeControlProps = {
	view: FormsLayout;
	setView: React.Dispatch<React.SetStateAction<FormsLayout>>;
};

export const ViewTypeControl = ({ view, setView }: ViewTypeControlProps) => {
	return (
		<SegmentedControl
			data={[
				{
					label: <Label title="Grid" icon={<IconLayoutGrid />} />,
					value: "grid",
				},
				{
					label: <Label title="List" icon={<IconList />} />,
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

function Label({ icon, title }: { icon: React.ReactElement; title: string }) {
	return (
		<Group wrap="nowrap" gap={6}>
			{icon}
			<span>{title}</span>
		</Group>
	);
}
