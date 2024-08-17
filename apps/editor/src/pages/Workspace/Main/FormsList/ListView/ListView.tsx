import { Button, Group, Text } from "@mantine/core";
import type { FormViewProps } from "../types";
import styles from "./ListView.module.css";

export const ListView = ({
	formName,
	buttonProps,
	responsesText,
}: FormViewProps) => {
	return (
		<Button
			{...buttonProps}
			fullWidth
			classNames={{
				label: styles.buttonLabel,
			}}
		>
			<Group gap={24} justify="space-between" w="100%" pr={8} wrap="nowrap">
				<Text fw={500}>{formName}</Text>
				<Text size="sm">{responsesText}</Text>
			</Group>
		</Button>
	);
};
