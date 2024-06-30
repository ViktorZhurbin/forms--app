import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useParams } from "wouter";
import { QuestionColorsByGroup } from "~/constants/questionMaps";
import { QuestionGroups, QuestionTypes } from "~/constants/questions";
import { createQuestion } from "~/models/methods";
import { NavbarQuestionsList } from "../NavbarQuestionsList/NavbarQuestionsList";

export const NavbarQuestions = () => {
	const formId = useParams()?.id;

	const createDummyTextQuestion = () => {
		if (!formId) return;

		createQuestion({
			formId,
			title: "ShortText",
			type: QuestionTypes.ShortText,
			group: QuestionGroups.Text,
		});
	};

	const createDummyChoiceQuestion = () => {
		if (!formId) return;

		createQuestion({
			formId,
			title: "Multiple Choice",
			type: QuestionTypes.MultipleChoice,
			group: QuestionGroups.Choice,
		});
	};

	return (
		<Stack gap={8}>
			<Group justify="space-between" gap={8}>
				<Text c="dimmed" size="sm" mb={8} p="0 12px">
					Questions
				</Text>
				<Group gap={8}>
					<ActionIcon
						c="black"
						bg={QuestionColorsByGroup.choice}
						onClick={createDummyChoiceQuestion}
					>
						<IconPlus />
					</ActionIcon>
					<ActionIcon
						c="black"
						bg={QuestionColorsByGroup.text}
						onClick={createDummyTextQuestion}
					>
						<IconPlus />
					</ActionIcon>
				</Group>
			</Group>

			{!!formId && <NavbarQuestionsList formId={formId} />}
		</Stack>
	);
};
