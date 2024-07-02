import { Group, Stack, Text } from "@mantine/core";
import { AddBlockButton } from "../../components/AddBlockButton/AddBlockButton";
import { useFormId } from "../../hooks/useFormId";
import { NavbarQuestionsList } from "../NavbarQuestionsList/NavbarQuestionsList";

export const NavbarQuestions = () => {
	const formId = useFormId();

	return (
		<Stack gap={8}>
			<Group justify="space-between" gap={8}>
				<Text c="dimmed" size="sm" p="0 12px">
					Questions
				</Text>
				<AddBlockButton tooltip="Add block" />
			</Group>

			<NavbarQuestionsList formId={formId} />
		</Stack>
	);
};
