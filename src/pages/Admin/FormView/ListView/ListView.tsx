import { Button, Stack, Text } from "@mantine/core";
import type { FormViewProps } from "../types";

export const ListView = ({ forms, onClickForm }: FormViewProps) => {
	return (
		<Stack gap={6}>
			{forms.map(({ id, name }) => (
				<Button
					key={name}
					size="md"
					variant="default"
					justify="start"
					onClick={() => {
						onClickForm(id);
					}}
				>
					<Text>{name}</Text>
				</Button>
			))}
		</Stack>
	);
};
