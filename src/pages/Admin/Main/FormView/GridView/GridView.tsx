import { Button, Group, Stack, Text } from "@mantine/core";
import type { FormViewProps } from "../types";

export const GridView = ({ forms, onClickForm }: FormViewProps) => {
	return (
		<Group gap={4}>
			{forms.map(({ id, name, responseCount }) => (
				<Button
					key={name}
					size="md"
					variant="default"
					justify="start"
					w={200}
					h={100}
					onClick={() => {
						onClickForm(id);
					}}
				>
					<Stack gap={4} align="start">
						<Text size="sm" fw={500}>
							{name}
						</Text>
						<Text size="sm">{responseCount} responses</Text>
					</Stack>
				</Button>
			))}
		</Group>
	);
};
