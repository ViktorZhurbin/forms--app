import { Stack, Text } from "@mantine/core";
import { formFields } from "../../../../mocks/formQuestions";
import { NavbarQuestion } from "./NavbarQuestion/NavbarQuestion";

export const NavQuestions = () => {
	return (
		<>
			<Text c="dimmed" size="sm" mb={8} p="0 12px">
				Questions
			</Text>
			<Stack gap={4}>
				{formFields.map(({ id, group, title }, index) => (
					<NavbarQuestion
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
