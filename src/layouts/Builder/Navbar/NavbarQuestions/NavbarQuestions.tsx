import { ActionIcon, Group, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { QuestionGroupsMap } from "~/constants/questionMaps";
import { QuestionGroups, QuestionTypes } from "~/constants/questions";
import { createQuestion } from "~/models/methods";
import { useFormId } from "../../hooks/useFormId";
import { NavbarQuestionsList } from "../NavbarQuestionsList/NavbarQuestionsList";

export const NavbarQuestions = () => {
	const formId = useFormId();

	const createDummyTextQuestion = () => {
		createQuestion({
			formId,
			title: "ShortText",
			type: QuestionTypes.ShortText,
			group: QuestionGroups.Text,
		});
	};

	const createDummyChoiceQuestion = () => {
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
						bg={QuestionGroupsMap.Choice.bgColor}
						onClick={createDummyChoiceQuestion}
					>
						<IconPlus />
					</ActionIcon>
					<ActionIcon
						c="black"
						bg={QuestionGroupsMap.Text.bgColor}
						onClick={createDummyTextQuestion}
					>
						<IconPlus />
					</ActionIcon>
				</Group>
			</Group>

			<NavbarQuestionsList formId={formId} />
		</Stack>
	);
};
