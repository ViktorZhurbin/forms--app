import { FetchState } from "@/shared/components/FetchState/FetchState";
import { useCurrentFormFieldsQuery } from "@/shared/models/field/read";
import { Group, Stack, Text } from "@mantine/core";
import { AddBlockButton } from "../../../../components/AddBlockButton/AddBlockButton";
import { NavbarFieldsList } from "../NavbarFieldsList/NavbarFieldsList";

export const NavbarFields = () => {
	const { isLoading, error } = useCurrentFormFieldsQuery();

	if (isLoading || error) {
		return <FetchState error={error} isLoading={isLoading} />;
	}

	return (
		<Stack gap={8}>
			<Group justify="space-between" gap={8}>
				<Text c="dimmed" size="sm" p="0 12px">
					Questions
				</Text>
				<AddBlockButton tooltip="Add block" />
			</Group>

			<NavbarFieldsList />
		</Stack>
	);
};
