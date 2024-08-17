import { Button, Stack, Text } from "@mantine/core";
import type { FormViewProps } from "../types";

export const GridView = ({
	formName,
	buttonProps,
	responsesText,
}: FormViewProps) => {
	return (
		<Button {...buttonProps} justify="start" w={200} h={100}>
			<Stack gap={4} align="start">
				<Text fw={500}>{formName}</Text>
				<Text size="sm">{responsesText}</Text>
			</Stack>
		</Button>
	);
};
