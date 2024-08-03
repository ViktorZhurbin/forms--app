import { SegmentedControl } from "@mantine/core";
import { useLocation, useParams } from "wouter";
import { type FormPathParams, Tabs } from "~/constants/routes";
import { RouteUtils } from "~/utils/routes";

export const SectionsControl = () => {
	const [, setLocation] = useLocation();
	const { formNanoId, tabName } = useParams<FormPathParams>();

	return (
		<SegmentedControl
			data={[
				{
					label: "Create",
					value: Tabs.Create,
				},
				{
					label: "Results",
					value: Tabs.Results,
				},
			]}
			value={tabName}
			onChange={(tabName) => {
				const path = RouteUtils.getFormPath({ formNanoId, tabName });

				setLocation(path);
			}}
		/>
	);
};
