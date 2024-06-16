import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";

export const CreateFormButton = () => {
	return (
		<Button
			leftSection={<IconPlus />}
			onClick={() => {
				navigate("/forms/id/create");
			}}
		>
			Create form
		</Button>
	);
};
