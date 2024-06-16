import { Stack, Text } from "@mantine/core";
import { formFields } from "../../../../mocks/formQuestions";
import { Question } from "./Question/Question";

export const NavQuestions = () => {
	return (
		<>
			<Text c="dimmed" size="sm" mb={8} p="0 12px">
				Questions
			</Text>
			<Stack gap={8}>
				{formFields.map(({ id, group, title }, index) => (
					<Question
						key={id}
						id={id}
						order={index + 1}
						group={group}
						title={title}
					/>
				))}
			</Stack>
		</>
	);
};
