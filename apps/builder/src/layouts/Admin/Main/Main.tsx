import { FormsLayout } from "@forms/shared/constants/forms";
import { Group, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { CreateFormButton } from "./CreateFormButton/CreateFormButton";
import { FormsView } from "./FormView/FormsView";
import { ViewTypeControl } from "./ViewTypeControl/ViewTypeControl";

export const Main = () => {
	const [view, setView] = useState<FormsLayout>(FormsLayout.Grid);

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

			<FormsView view={view} />
		</Stack>
	);
};
