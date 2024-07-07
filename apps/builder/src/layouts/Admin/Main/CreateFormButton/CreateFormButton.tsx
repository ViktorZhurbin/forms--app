import { Routes } from "@/shared/constants/location";
import { createForm } from "@/shared/models/forms/write/write";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";

export const CreateFormButton = () => {
	const handleCreateForm = async () => {
		const formId = await createForm();

		const formPath = Routes.getFormPath(formId);
		navigate(formPath);
	};

	return (
		<Button leftSection={<IconPlus />} onClick={handleCreateForm}>
			New form
		</Button>
	);
};
