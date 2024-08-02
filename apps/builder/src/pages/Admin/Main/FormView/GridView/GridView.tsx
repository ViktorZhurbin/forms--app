import { Button, Group, Stack, Text } from "@mantine/core";
import { Link } from "wouter";
import type { FormViewProps } from "../types";

export const GridView = ({
	href,
	name,
	nanoId,
	className,
	responsesText,
	getDeleteButton,
}: FormViewProps) => {
	return (
		<Button
			size="md"
			variant="default"
			justify="start"
			w={200}
			h={100}
			className={className}
			component={Link}
			href={href}
		>
			<Stack gap={4} align="start">
				<Group justify="space-between">
					<Text size="sm" fw={500}>
						{name}
					</Text>
					{getDeleteButton({ nanoId })}
				</Group>
				<Text size="sm">{responsesText}</Text>
			</Stack>
		</Button>
	);
};
