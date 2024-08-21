import { SearchParams } from "@/shared/constants/location";
import { ModalIds } from "@/shared/constants/modals";
import { useWorkspaceNanoId } from "@/shared/hooks/useWorkspaceNanoId";
import { createForm } from "@/shared/models/form/write/write";
import { navigateWithSearch } from "@/shared/utils/searchParams";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { RouteUtils } from "~/utils/routes";

export const CreateFormButton = () => {
	const wsNanoId = useWorkspaceNanoId();

	const handleCreateForm = async () => {
		const formNanoId = await createForm({ wsNanoId });
		const formPath = RouteUtils.getFormPath({ formNanoId });

		navigateWithSearch({ [SearchParams.MODAL]: ModalIds.ADD_FIELD }, formPath);
	};

	return (
		<Button leftSection={<IconPlus />} onClick={handleCreateForm}>
			New form
		</Button>
	);
};
