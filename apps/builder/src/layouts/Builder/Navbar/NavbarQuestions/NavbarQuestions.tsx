import { FetchState } from "@/shared/components/FetchState/FetchState";
import { Routes } from "@/shared/constants/location";
import { useCurrentFormQuery } from "@/shared/models/forms/read";
import { Group, Stack, Text } from "@mantine/core";
import { Redirect } from "wouter";
import { AddBlockButton } from "../../components/AddBlockButton/AddBlockButton";
import { NavbarQuestionsList } from "../NavbarQuestionsList/NavbarQuestionsList";

export const NavbarQuestions = () => {
	const { isLoading, error, data } = useCurrentFormQuery();

	if (!data) {
		return <FetchState error={error} isLoading={isLoading} />;
	}

	const form = data.forms?.[0];

	if (!form) {
		// can happen if url has incorrect form id
		return <Redirect to={Routes.ROOT} />;
	}

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
