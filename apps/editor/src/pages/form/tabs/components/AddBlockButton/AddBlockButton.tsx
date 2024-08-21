import { IconButton } from "@/shared/components/IconButton/IconButton";
import { IconPlus } from "@tabler/icons-react";
import { useAddFieldModal } from "~/pages/form/hooks/useAddFieldModal";

export const AddBlockButton = ({
	tooltip,
	insertBefore,
}: { tooltip: string; insertBefore?: boolean }) => {
	const { modalActions } = useAddFieldModal({ insertBefore });

	return (
		<IconButton size="sm" tooltip={tooltip} onClick={modalActions.open}>
			<IconPlus />
		</IconButton>
	);
};
