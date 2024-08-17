import { Button, Group, Text } from "@mantine/core";
import { Link } from "wouter";
import type { FormViewProps } from "../types";
import styles from "./ListView.module.css";

export const ListView = ({
	name,
	href,
	className,
	responsesText,
	deleteButton,
}: FormViewProps) => {
	return (
		<Button
			size="md"
			variant="default"
			className={className}
			classNames={{
				label: styles.buttonLabel,
			}}
			component={Link}
			href={href}
		>
			<Group gap={24} justify="space-between" w="100%" pr={8}>
				<Text ta="start">{name}</Text>
				<Text ta="end" size="sm">
					{responsesText}
				</Text>
				{deleteButton}
			</Group>
		</Button>
	);
};
