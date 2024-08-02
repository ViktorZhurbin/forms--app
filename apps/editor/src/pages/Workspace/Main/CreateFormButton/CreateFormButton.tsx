import { useWorkspaceNanoId } from "@/shared/hooks/useWorkspaceNanoId";
import { createForm } from "@/shared/models/form/write/write";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { navigate } from "wouter/use-browser-location";
import { RouteUtils } from "~/utils/routes";

export const CreateFormButton = () => {
	const wsNanoId = useWorkspaceNanoId();

	const handleCreateForm = async () => {
		const formNanoId = await createForm({ wsNanoId });
		const formPath = RouteUtils.getFormPath({ formNanoId });

		navigate(formPath);
	};

	return (
		<Button leftSection={<IconPlus />} onClick={handleCreateForm}>
			New form
		</Button>
	);
};
