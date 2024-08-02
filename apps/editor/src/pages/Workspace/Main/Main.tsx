import { Group, Stack, Text } from "@mantine/core";
import { useLocalFormsLayout } from "../hooks/useLocalFormsLayout";
import { CreateFormButton } from "./CreateFormButton/CreateFormButton";
import { FormsList } from "./FormView/FormsList";
import { ViewTypeControl } from "./ViewTypeControl/ViewTypeControl";

export const Main = () => {
	const [view, setView] = useLocalFormsLayout();

	return (
		<Stack flex={1}>
			<Group justify="space-between" align="center">
				<ViewTypeControl view={view} setView={setView} />
				<CreateFormButton />
			</Group>

			<Group gap={8}>
				<Text tt="uppercase" c="dimmed" size="xs" fw={500}>
					Your Forms
				</Text>
			</Group>

			<FormsList viewType={view} />
		</Stack>
	);
};
