import { Button, Group, Text } from "@mantine/core";
import { Link } from "wouter";
import type { FormViewProps } from "../types";

export const ListView = ({
	name,
	href,
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
			className={className}
			component={Link}
			href={href}
		>
			<Group gap={24}>
				<Text>{name}</Text>
				<Text size="sm">{responsesText}</Text>
				{getDeleteButton({ nanoId })}
			</Group>
		</Button>
	);
};
