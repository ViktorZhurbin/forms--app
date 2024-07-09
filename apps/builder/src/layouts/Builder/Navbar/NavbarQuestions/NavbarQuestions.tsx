import { FetchError } from "@/shared/components/FetchError/FetchError";
import { FetchLoading } from "@/shared/components/FetchLoading/FetchLoading";
import { useCurrentFormQuery } from "@/shared/models/forms/read";
import { Group, Stack, Text } from "@mantine/core";
import { AddBlockButton } from "../../components/AddBlockButton/AddBlockButton";
import { NavbarQuestionsList } from "../NavbarQuestionsList/NavbarQuestionsList";

export const NavbarQuestions = () => {
	const { isLoading, error, data } = useCurrentFormQuery();

	if (error) {
		return <FetchError message={error.message} />;
	}

	if (isLoading) {
		return <FetchLoading />;
	}

	const form = data?.forms?.[0];

	return (
		<Stack gap={8}>
			<Group justify="space-between" gap={8}>
				<Text c="dimmed" size="sm" p="0 12px">
					Questions
				</Text>
				<AddBlockButton tooltip="Add block" />
			</Group>

			<NavbarQuestionsList questions={form.draftQuestions} />
		</Stack>
	);
};
