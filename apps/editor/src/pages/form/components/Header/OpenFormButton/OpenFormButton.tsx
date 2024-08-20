import { IconButton } from "@/shared/components/IconButton/IconButton";
import { useFormPublishedFields } from "@/shared/models/field/read";
import { IconExternalLink } from "@tabler/icons-react";
import { useFormUrl } from "~/pages/form/hooks/useFormUrl";

export const OpenFormButton = () => {
	const url = useFormUrl();
	const fields = useFormPublishedFields();

	const isDisabled = !fields?.length || !url;

	return (
		url && (
			<IconButton
				disabled={isDisabled}
				tooltip="Open form"
				onClick={() => {
					window.open(url, "_blank");
				}}
			>
				<IconExternalLink />
			</IconButton>
		)
	);
};
