import { Routes } from "@/shared/constants/routes";
import { useWorkspaceNanoId } from "@/shared/hooks/useWorkspaceNanoId";
import { createForm } from "@/shared/models/form/write/write";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";

export const CreateFormButton = () => {
	const wsNanoId = useWorkspaceNanoId();

	const handleCreateForm = async () => {
		const formId = await createForm({ wsNanoId });

		const formPath = Routes.getFormPath({ formId });
		navigate(formPath);
	};

	return (
		<Button leftSection={<IconPlus />} onClick={handleCreateForm}>
			New form
		</Button>
	);
};
