import { Button, Group, Text } from "@mantine/core";
import { Link } from "wouter";
import type { FormViewProps } from "../types";

export const ListView = ({
	id,
	name,
	getHref,
	getDeleteButton,
}: FormViewProps) => {
	return (
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
	);
};
