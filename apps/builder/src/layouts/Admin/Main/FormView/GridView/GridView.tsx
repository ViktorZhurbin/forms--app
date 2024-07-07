import { Button, Group, Stack, Text } from "@mantine/core";
import { Link } from "wouter";
import type { FormViewProps } from "../types";

export const GridView = ({
	id,
	name,
	getHref,
	className,
	responsesText,
	getDeleteButton,
}: FormViewProps) => {
	return (
		<Button
			key={id}
			size="md"
			variant="default"
			justify="start"
			w={200}
			h={100}
			className={className}
			component={Link}
			href={getHref(id)}
		>
			<Stack gap={4} align="start">
				<Group justify="space-between">
					<Text size="sm" fw={500}>
						{name}
					</Text>
					{getDeleteButton(id)}
				</Group>
				<Text size="sm">{responsesText}</Text>
			</Stack>
		</Button>
	);
};
