import { Button, Stack, Text } from "@mantine/core";
import type { FormViewProps } from "../types";

export const ListView = ({ forms, getHref }: FormViewProps) => {
	return (
		<Stack gap={6}>
			{forms.map(({ id, name }) => (
				<Button
					key={id}
					size="md"
					variant="default"
					justify="start"
					component="a"
					href={getHref(id)}
				>
					<Text>{name}</Text>
				</Button>
			))}
		</Stack>
	);
};
