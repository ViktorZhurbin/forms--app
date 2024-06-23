import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Routes } from "~/constants/location";

export const CreateFormButton = () => {
	return (
		<Button
			component="a"
			leftSection={<IconPlus />}
			href={`${Routes.getFormPath("id")}`}
		>
			Create form
		</Button>
	);
};
