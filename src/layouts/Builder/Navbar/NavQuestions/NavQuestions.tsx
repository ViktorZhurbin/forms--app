import { ActionIcon, Group, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useParams } from "wouter";
import { QuestionColorsByGroup } from "~/constants/questionMaps";
import { QuestionGroups, QuestionTypes } from "~/constants/questions";
import { db } from "~/models/db";
import { createQuestion } from "~/models/methods";
import { useSelectedBlockId } from "../../hooks/useSelectedBlockId";
import styles from "./NavQuestions.module.css";
import { NavbarQuestion } from "./NavbarQuestion/NavbarQuestion";

export const NavQuestions = () => {
	const formId = useParams()?.id ?? "440f17cc-35ba-4ed2-8a0e-46ffa8b0e3d5";

	const createDummyTextQuestion = () =>
		createQuestion({
			formId,
			title: "ShortText",
			type: QuestionTypes.ShortText,
			group: QuestionGroups.Text,
		});

	const createDummyChoiceQuestion = () =>
		createQuestion({
			formId,
			title: "Multiple Choice",
			type: QuestionTypes.MultipleChoice,
			group: QuestionGroups.Choice,
		});

	const { isLoading, error, data } = db.useQuery({
		questions: {
			$: { where: { formId } },
		},
	});

	const selectedBlockId = useSelectedBlockId(data?.questions[0]?.id);

	if (isLoading) {
		return <div>Fetching data...</div>;
	}

	if (error) {
		return <div>Error fetching data: {error.message}</div>;
	}

	return (
		<>
			<Group justify="space-between">
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
			<div className={styles.questionsList}>
				{data.questions.map(({ id, group, title }, index) => (
					<NavbarQuestion
						key={id}
						id={id}
						order={index + 1}
						group={group}
						title={title}
						isSelected={selectedBlockId ? id === selectedBlockId : index === 0}
					/>
				))}
			</div>
		</>
	);
};
