import { Group, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { FormsLayout } from "../../../constants/forms";
import { CreateFormButton } from "./CreateFormButton/CreateFormButton";
import { FormsView } from "./FormView/FormsView";
import { ViewTypeControl } from "./ViewTypeControl/ViewTypeControl";

export const Main = () => {
	const [view, setView] = useState<FormsLayout>(FormsLayout.Grid);

	return (
		<Stack>
			<Group justify="space-between" align="center">
				<ViewTypeControl view={view} setView={setView} />
				<CreateFormButton />
			</Group>

			<Text tt="uppercase" c="dimmed" size="xs" fw={500}>
				Your Forms
			</Text>
			<FormsView view={view} />
		</Stack>
	);
};
