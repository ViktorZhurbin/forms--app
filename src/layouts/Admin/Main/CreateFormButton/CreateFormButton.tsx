import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { createForm } from "~/models/methods";

const createDummyForm = () => {
	const getRandomInt = () => Math.floor(Math.random() * 50) + 1;

	createForm({
		name: `Form ${getRandomInt()}`,
		responseCount: getRandomInt(),
	});
};

export const CreateFormButton = () => {
	return (
		<Button leftSection={<IconPlus />} onClick={createDummyForm}>
			Create form
		</Button>
	);
};
