import { Button, Group, Stack, Text } from "@mantine/core";
import { Link } from "wouter";
import type { FormViewProps } from "../types";

export const ListView = ({
	forms,
	getHref,
	getDeleteButton,
}: FormViewProps) => {
	return (
		<Stack gap={6}>
			{forms.map(({ id, name }) => (
				<Button
					key={id}
					size="md"
					variant="default"
					justify="start"
					component={Link}
					href={getHref(id)}
				>
					<Group gap={24}>
						<Text>{name}</Text>
						{getDeleteButton(id)}
					</Group>
				</Button>
			))}
		</Stack>
	);
};
