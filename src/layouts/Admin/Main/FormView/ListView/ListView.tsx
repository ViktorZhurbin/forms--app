import { Button, Group, Text } from "@mantine/core";
import { Link } from "wouter";
import type { FormViewProps } from "../types";

export const ListView = ({
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
			className={className}
			component={Link}
			href={getHref(id)}
		>
			<Group gap={24}>
				<Text>{name}</Text>
				<Text size="sm">{responsesText}</Text>
				{getDeleteButton(id)}
			</Group>
		</Button>
	);
};
